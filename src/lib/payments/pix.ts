// BetBlox - Sistema PIX Profissional para Apostas Online
import crypto from 'crypto'
import QRCode from 'qrcode'
import { PrismaClient } from '@prisma/client'
import { auditLog } from '@/lib/logging/audit'

const prisma = new PrismaClient()

export interface PIXPaymentData {
  amount: number
  userId: string
  description: string
  pixKey?: string // Para saques
  type: 'DEPOSIT' | 'WITHDRAWAL'
}

export interface PIXResponse {
  success: boolean
  transactionId?: string
  qrCode?: string
  pixKey?: string
  txId?: string
  expiresAt?: Date
  error?: string
}

export class PIXService {
  private readonly merchantId: string
  private readonly apiKey: string
  private readonly webhookSecret: string
  
  constructor() {
    this.merchantId = process.env.PIX_MERCHANT_ID || ''
    this.apiKey = process.env.PIX_API_KEY || ''
    this.webhookSecret = process.env.PIX_WEBHOOK_SECRET || ''
  }
  
  /**
   * Gera QR Code PIX para depósito
   */
  async generateDepositQR(data: PIXPaymentData): Promise<PIXResponse> {
    try {
      // Validações obrigatórias
      if (data.amount < 1 || data.amount > 50000) {
        return { success: false, error: 'Valor inválido. Mín: R$ 1,00 - Máx: R$ 50.000,00' }
      }
      
      // Verificar limites do usuário
      const user = await prisma.user.findUnique({
        where: { id: data.userId }
      })
      
      if (!user) {
        return { success: false, error: 'Usuário não encontrado' }
      }
      
      if (user.kycStatus !== 'APPROVED') {
        return { success: false, error: 'KYC não aprovado. Complete sua verificação.' }
      }
      
      // Verificar auto-exclusão
      if (user.permanentExclusion || (user.selfExclusionUntil && new Date(user.selfExclusionUntil) > new Date())) {
        return { success: false, error: 'Conta em auto-exclusão' }
      }
      
      // Gerar ID único da transação
      const transactionId = this.generateTransactionId()
      const txId = this.generateTxId()
      
      // Criar transação no banco
      const transaction = await prisma.transaction.create({
        data: {
          id: transactionId,
          userId: data.userId,
          type: 'DEPOSIT',
          status: 'PENDING',
          amount: data.amount,
          netAmount: data.amount,
          description: data.description,
          pixTxId: txId,
          ipAddress: '0.0.0.0', // Será atualizado no controller
          userAgent: 'system'
        }
      })
      
      // Gerar payload PIX BR Code
      const pixPayload = this.generateBRCode({
        merchantId: this.merchantId,
        amount: data.amount,
        txId: txId,
        description: data.description
      })
      
      // Gerar QR Code
      const qrCodeData = await QRCode.toDataURL(pixPayload, {
        width: 300,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      // Log de auditoria
      await auditLog({
        userId: data.userId,
        action: 'PIX_DEPOSIT_CREATED',
        category: 'PAYMENT',
        details: {
          transactionId,
          amount: data.amount,
          txId
        },
        ipAddress: '0.0.0.0',
        userAgent: 'system'
      })
      
      return {
        success: true,
        transactionId,
        qrCode: qrCodeData,
        txId,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutos
      }
      
    } catch (error) {
      console.error('Erro ao gerar PIX:', error)
      return { success: false, error: 'Erro interno do sistema' }
    }
  }
  
  /**
   * Processa saque via PIX
   */
  async processWithdrawal(data: PIXPaymentData): Promise<PIXResponse> {
    try {
      if (!data.pixKey) {
        return { success: false, error: 'Chave PIX obrigatória para saque' }
      }
      
      // Validações
      if (data.amount < 10 || data.amount > 10000) {
        return { success: false, error: 'Valor inválido. Mín: R$ 10,00 - Máx: R$ 10.000,00' }
      }
      
      const user = await prisma.user.findUnique({
        where: { id: data.userId }
      })
      
      if (!user) {
        return { success: false, error: 'Usuário não encontrado' }
      }
      
      // Verificar saldo
      if (user.balance < data.amount) {
        return { success: false, error: 'Saldo insuficiente' }
      }
      
      // Verificar 2FA para saques
      if (!user.twoFactorEnabled) {
        return { success: false, error: '2FA obrigatório para saques' }
      }
      
      // Taxa de saque (conforme regulamentação)
      const fee = this.calculateWithdrawalFee(data.amount)
      const netAmount = data.amount - fee
      
      const transactionId = this.generateTransactionId()
      
      // Criar transação de saque
      const transaction = await prisma.transaction.create({
        data: {
          id: transactionId,
          userId: data.userId,
          type: 'WITHDRAW',
          status: 'PROCESSING',
          amount: data.amount,
          fee,
          netAmount,
          pixKey: data.pixKey,
          description: data.description,
          ipAddress: '0.0.0.0',
          userAgent: 'system'
        }
      })
      
      // Debitar saldo (reserva)
      await prisma.user.update({
        where: { id: data.userId },
        data: { balance: { decrement: data.amount } }
      })
      
      // Enviar para processamento (mock)
      const pixResult = await this.sendToPixGateway({
        pixKey: data.pixKey,
        amount: netAmount,
        description: data.description,
        txId: transactionId
      })
      
      if (pixResult.success) {
        await prisma.transaction.update({
          where: { id: transactionId },
          data: { 
            status: 'COMPLETED',
            completedAt: new Date(),
            pixTxId: pixResult.txId
          }
        })
        
        // Log de auditoria
        await auditLog({
          userId: data.userId,
          action: 'PIX_WITHDRAWAL_COMPLETED',
          category: 'PAYMENT',
          details: {
            transactionId,
            amount: data.amount,
            fee,
            netAmount,
            pixKey: data.pixKey
          },
          ipAddress: '0.0.0.0',
          userAgent: 'system'
        })
        
        return {
          success: true,
          transactionId,
          txId: pixResult.txId
        }
      } else {
        // Reverter saldo em caso de erro
        await prisma.user.update({
          where: { id: data.userId },
          data: { balance: { increment: data.amount } }
        })
        
        await prisma.transaction.update({
          where: { id: transactionId },
          data: { status: 'FAILED' }
        })
        
        return { success: false, error: 'Falha no processamento PIX' }
      }
      
    } catch (error) {
      console.error('Erro no saque PIX:', error)
      return { success: false, error: 'Erro interno do sistema' }
    }
  }
  
  /**
   * Webhook para confirmação PIX
   */
  async handleWebhook(payload: any, signature: string): Promise<boolean> {
    try {
      // Verificar assinatura
      if (!this.verifyWebhookSignature(payload, signature)) {
        console.error('Assinatura webhook inválida')
        return false
      }
      
      const { txId, status, amount } = payload
      
      // Buscar transação
      const transaction = await prisma.transaction.findFirst({
        where: { pixTxId: txId }
      })
      
      if (!transaction) {
        console.error('Transação não encontrada:', txId)
        return false
      }
      
      if (status === 'APPROVED' && transaction.type === 'DEPOSIT') {
        // Confirmar depósito
        await prisma.transaction.update({
          where: { id: transaction.id },
          data: {
            status: 'COMPLETED',
            completedAt: new Date()
          }
        })
        
        // Creditar saldo
        await prisma.user.update({
          where: { id: transaction.userId },
          data: { balance: { increment: transaction.amount } }
        })
        
        // Log de auditoria
        await auditLog({
          userId: transaction.userId,
          action: 'PIX_DEPOSIT_CONFIRMED',
          category: 'PAYMENT',
          details: {
            transactionId: transaction.id,
            amount: transaction.amount,
            txId
          },
          ipAddress: '0.0.0.0',
          userAgent: 'webhook'
        })
        
        return true
      }
      
      return false
      
    } catch (error) {
      console.error('Erro no webhook PIX:', error)
      return false
    }
  }
  
  /**
   * Gera BR Code (Payload PIX)
   */
  private generateBRCode(data: {
    merchantId: string
    amount: number
    txId: string
    description: string
  }): string {
    // Implementação simplificada do BR Code
    // Em produção, usar biblioteca específica como 'pix-payload'
    
    const payload = [
      '00020101', // Payload Format Indicator
      '010212', // Point of Initiation Method
      `26${this.formatField(data.merchantId)}`, // Merchant Account Information
      '52040000', // Merchant Category Code (Jogos)
      '5303986', // Transaction Currency (BRL)
      `54${data.amount.toFixed(2).length.toString().padStart(2, '0')}${data.amount.toFixed(2)}`,
      '5802BR', // Country Code
      `59${this.formatField('BETBLOX')}`, // Merchant Name
      `60${this.formatField('SAO PAULO')}`, // Merchant City
      `62${this.formatField(data.txId)}` // Additional Data Field
    ].join('')
    
    // Calcular CRC16
    const crc = this.calculateCRC16(payload + '6304')
    
    return payload + '6304' + crc
  }
  
  /**
   * Formata campo para BR Code
   */
  private formatField(value: string): string {
    const length = value.length.toString().padStart(2, '0')
    return length + value
  }
  
  /**
   * Calcula CRC16 para BR Code
   */
  private calculateCRC16(data: string): string {
    // Implementação CRC16-CCITT
    let crc = 0xFFFF
    
    for (let i = 0; i < data.length; i++) {
      crc ^= data.charCodeAt(i) << 8
      
      for (let j = 0; j < 8; j++) {
        if (crc & 0x8000) {
          crc = (crc << 1) ^ 0x1021
        } else {
          crc <<= 1
        }
      }
    }
    
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0')
  }
  
  /**
   * Gera ID único da transação
   */
  private generateTransactionId(): string {
    return 'BTX' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
  }
  
  /**
   * Gera TX ID para PIX
   */
  private generateTxId(): string {
    return crypto.randomBytes(16).toString('hex').toUpperCase()
  }
  
  /**
   * Calcula taxa de saque
   */
  private calculateWithdrawalFee(amount: number): number {
    // Taxa progressiva conforme regulamentação
    if (amount <= 100) return 2.00
    if (amount <= 1000) return 5.00
    return amount * 0.01 // 1%
  }
  
  /**
   * Verifica assinatura do webhook
   */
  private verifyWebhookSignature(payload: any, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(JSON.stringify(payload))
      .digest('hex')
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )
  }
  
  /**
   * Mock - Enviar para gateway PIX
   */
  private async sendToPixGateway(data: {
    pixKey: string
    amount: number
    description: string
    txId: string
  }): Promise<{ success: boolean; txId?: string }> {
    // Mock - Em produção integrar com gateway real (Mercado Pago, PagSeguro, etc.)
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 95% de sucesso (para demonstração)
    const success = Math.random() > 0.05
    
    return {
      success,
      txId: success ? crypto.randomBytes(16).toString('hex') : undefined
    }
  }
}

export const pixService = new PIXService()
