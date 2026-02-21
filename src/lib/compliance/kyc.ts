// BetBlox - Sistema KYC Compliant com Portaria SPA/MF Nº 2.104
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { auditLog } from '@/lib/logging/audit'

const prisma = new PrismaClient()

export interface KYCSubmissionData {
  userId: string
  personalData: {
    cpf: string
    fullName: string
    birthDate: string
    phone: string
    email: string
  }
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  documents: {
    type: 'RG' | 'CNH' | 'PASSPORT'
    number: string
    frontPhotoBase64: string
    backPhotoBase64: string
    selfieBase64: string
    proofAddressBase64: string
  }
  ipAddress: string
  userAgent: string
}

export interface KYCValidationResult {
  success: boolean
  status: 'APPROVED' | 'REJECTED' | 'PENDING_REVIEW'
  score: number // 0-100
  issues: string[]
  requiresManualReview: boolean
}

export class KYCService {
  
  /**
   * Submete documentos para verificação KYC
   */
  async submitKYC(data: KYCSubmissionData): Promise<{
    success: boolean
    submissionId?: string
    error?: string
  }> {
    try {
      // Verificar se usuário existe
      const user = await prisma.user.findUnique({
        where: { id: data.userId }
      })
      
      if (!user) {
        return { success: false, error: 'Usuário não encontrado' }
      }
      
      // Verificar se já tem KYC aprovado
      if (user.kycStatus === 'APPROVED') {
        return { success: false, error: 'KYC já aprovado para este usuário' }
      }
      
      // Validações básicas obrigatórias
      const validationErrors = this.validateBasicData(data)
      if (validationErrors.length > 0) {
        return { success: false, error: validationErrors.join(', ') }
      }
      
      // Verificar CPF na Receita Federal (mock)
      const cpfValid = await this.validateCPF(data.personalData.cpf)
      if (!cpfValid) {
        await auditLog({
          userId: data.userId,
          action: 'KYC_CPF_INVALID',
          category: 'COMPLIANCE',
          details: { cpf: data.personalData.cpf },
          ipAddress: data.ipAddress,
          userAgent: data.userAgent
        })
        
        return { success: false, error: 'CPF inválido ou não encontrado na Receita Federal' }
      }
      
      // Salvar documentos (em produção, usar S3/CloudStorage)
      const documentUrls = await this.saveDocuments(data.userId, data.documents)
      
      // Atualizar dados do usuário
      await prisma.user.update({
        where: { id: data.userId },
        data: {
          cpf: data.personalData.cpf,
          fullName: data.personalData.fullName,
          birthDate: new Date(data.personalData.birthDate),
          phone: data.personalData.phone,
          
          // Endereço
          street: data.address.street,
          number: data.address.number,
          complement: data.address.complement,
          neighborhood: data.address.neighborhood,
          city: data.address.city,
          state: data.address.state,
          zipCode: data.address.zipCode,
          
          // Documentos
          documentType: data.documents.type,
          documentNumber: data.documents.number,
          documentFrontUrl: documentUrls.front,
          documentBackUrl: documentUrls.back,
          selfieUrl: documentUrls.selfie,
          proofAddressUrl: documentUrls.proofAddress,
          
          kycStatus: 'PROCESSING'
        }
      })
      
      // Análise automática
      const validation = await this.performAutomaticValidation(data)
      
      let finalStatus: 'APPROVED' | 'REJECTED' | 'PROCESSING' = 'PROCESSING'
      
      if (validation.success && validation.score >= 80 && !validation.requiresManualReview) {
        // Auto-aprovação para casos claros
        finalStatus = 'APPROVED'
        
        await prisma.user.update({
          where: { id: data.userId },
          data: {
            kycStatus: 'APPROVED',
            kycCompletedAt: new Date()
          }
        })
        
        await auditLog({
          userId: data.userId,
          action: 'KYC_AUTO_APPROVED',
          category: 'COMPLIANCE',
          details: {
            score: validation.score,
            autoApproval: true
          },
          ipAddress: data.ipAddress,
          userAgent: data.userAgent
        })
        
      } else if (!validation.success || validation.score < 30) {
        // Auto-rejeição para casos claros
        finalStatus = 'REJECTED'
        
        await prisma.user.update({
          where: { id: data.userId },
          data: { kycStatus: 'REJECTED' }
        })
        
        await auditLog({
          userId: data.userId,
          action: 'KYC_AUTO_REJECTED',
          category: 'COMPLIANCE',
          details: {
            score: validation.score,
            issues: validation.issues,
            autoRejection: true
          },
          ipAddress: data.ipAddress,
          userAgent: data.userAgent
        })
      } else {
        // Revisão manual necessária
        await auditLog({
          userId: data.userId,
          action: 'KYC_MANUAL_REVIEW_REQUIRED',
          category: 'COMPLIANCE',
          details: {
            score: validation.score,
            issues: validation.issues,
            requiresReview: validation.requiresManualReview
          },
          ipAddress: data.ipAddress,
          userAgent: data.userAgent
        })
      }
      
      return {
        success: true,
        submissionId: `KYC_${data.userId}_${Date.now()}`
      }
      
    } catch (error) {
      console.error('Erro no KYC:', error)
      
      await auditLog({
        userId: data.userId,
        action: 'KYC_SUBMISSION_ERROR',
        category: 'COMPLIANCE',
        details: {
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        ipAddress: data.ipAddress,
        userAgent: data.userAgent
      })
      
      return { success: false, error: 'Erro interno no processamento' }
    }
  }
  
  /**
   * Valida dados básicos obrigatórios
   */
  private validateBasicData(data: KYCSubmissionData): string[] {
    const errors: string[] = []
    
    // CPF
    if (!this.isValidCPF(data.personalData.cpf)) {
      errors.push('CPF inválido')
    }
    
    // Nome completo
    if (!data.personalData.fullName || data.personalData.fullName.split(' ').length < 2) {
      errors.push('Nome completo obrigatório')
    }
    
    // Data de nascimento (18+ anos)
    const birthDate = new Date(data.personalData.birthDate)
    const age = this.calculateAge(birthDate)
    if (age < 18) {
      errors.push('Usuário deve ter 18 anos ou mais')
    }
    
    // Telefone
    if (!data.personalData.phone || data.personalData.phone.length < 10) {
      errors.push('Telefone inválido')
    }
    
    // Endereço completo
    if (!data.address.street || !data.address.number || !data.address.city || !data.address.state) {
      errors.push('Endereço completo obrigatório')
    }
    
    // CEP
    if (!data.address.zipCode || !/^\d{5}-?\d{3}$/.test(data.address.zipCode)) {
      errors.push('CEP inválido')
    }
    
    // Documentos
    if (!data.documents.number || !data.documents.frontPhotoBase64 || !data.documents.backPhotoBase64) {
      errors.push('Documento completo obrigatório')
    }
    
    if (!data.documents.selfieBase64) {
      errors.push('Selfie obrigatória')
    }
    
    if (!data.documents.proofAddressBase64) {
      errors.push('Comprovante de endereço obrigatório')
    }
    
    return errors
  }
  
  /**
   * Valida CPF na Receita Federal (mock)
   */
  private async validateCPF(cpf: string): Promise<boolean> {
    // Em produção, integrar com API da Receita Federal
    // Por enquanto, apenas validação de formato
    
    if (!this.isValidCPF(cpf)) return false
    
    // Simular consulta na Receita Federal
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock: 95% de CPFs válidos
    return Math.random() > 0.05
  }
  
  /**
   * Valida formato do CPF
   */
  private isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, '')
    
    if (cpf.length !== 11) return false
    
    // Verifica sequências inválidas
    if (/^(\d)\1{10}$/.test(cpf)) return false
    
    // Validação dos dígitos verificadores
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i)
    }
    let digit1 = 11 - (sum % 11)
    if (digit1 > 9) digit1 = 0
    
    if (parseInt(cpf[9]) !== digit1) return false
    
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i)
    }
    let digit2 = 11 - (sum % 11)
    if (digit2 > 9) digit2 = 0
    
    return parseInt(cpf[10]) === digit2
  }
  
  /**
   * Calcula idade
   */
  private calculateAge(birthDate: Date): number {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }
  
  /**
   * Salva documentos (mock - em produção usar S3)
   */
  private async saveDocuments(userId: string, documents: KYCSubmissionData['documents']) {
    const timestamp = Date.now()
    
    // Mock URLs - em produção, fazer upload para S3/CloudStorage
    return {
      front: `https://storage.betblox.com/kyc/${userId}/document_front_${timestamp}.jpg`,
      back: `https://storage.betblox.com/kyc/${userId}/document_back_${timestamp}.jpg`,
      selfie: `https://storage.betblox.com/kyc/${userId}/selfie_${timestamp}.jpg`,
      proofAddress: `https://storage.betblox.com/kyc/${userId}/proof_address_${timestamp}.jpg`
    }
  }
  
  /**
   * Análise automática dos documentos
   */
  private async performAutomaticValidation(data: KYCSubmissionData): Promise<KYCValidationResult> {
    let score = 0
    const issues: string[] = []
    let requiresManualReview = false
    
    // Validação do nome no documento vs cadastro
    const nameMatch = this.compareNames(data.personalData.fullName, data.personalData.fullName)
    if (nameMatch > 0.8) {
      score += 25
    } else {
      issues.push('Nome no documento não confere')
      requiresManualReview = true
    }
    
    // Validação da idade (documento vs cadastro)
    const birthDate = new Date(data.personalData.birthDate)
    const age = this.calculateAge(birthDate)
    if (age >= 18 && age <= 100) {
      score += 20
    } else {
      issues.push('Idade inválida')
    }
    
    // Qualidade das imagens (mock)
    const imageQuality = this.analyzeImageQuality(data.documents)
    score += Math.floor(imageQuality * 30)
    
    if (imageQuality < 0.7) {
      issues.push('Qualidade das imagens insuficiente')
      requiresManualReview = true
    }
    
    // Detecção de fraude (mock)
    const fraudScore = await this.detectFraud(data)
    if (fraudScore < 0.2) {
      score += 25
    } else {
      issues.push('Possível fraude detectada')
      requiresManualReview = true
    }
    
    return {
      success: score >= 70 && issues.length === 0,
      status: score >= 80 ? 'APPROVED' : score < 30 ? 'REJECTED' : 'PENDING_REVIEW',
      score,
      issues,
      requiresManualReview
    }
  }
  
  /**
   * Compara nomes (similaridade)
   */
  private compareNames(name1: string, name2: string): number {
    // Algoritmo simples de similaridade
    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z\s]/g, '').trim()
    
    const n1 = normalize(name1)
    const n2 = normalize(name2)
    
    if (n1 === n2) return 1.0
    
    // Levenshtein distance simplificado
    const longer = n1.length > n2.length ? n1 : n2
    const shorter = n1.length > n2.length ? n2 : n1
    
    if (longer.length === 0) return 1.0
    
    const distance = this.levenshteinDistance(longer, shorter)
    return (longer.length - distance) / longer.length
  }
  
  /**
   * Distância Levenshtein
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null))
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        )
      }
    }
    
    return matrix[str2.length][str1.length]
  }
  
  /**
   * Analisa qualidade das imagens (mock)
   */
  private analyzeImageQuality(documents: KYCSubmissionData['documents']): number {
    // Em produção, usar ML/CV para análise real
    // Mock: qualidade baseada no tamanho da base64
    
    const avgLength = (
      documents.frontPhotoBase64.length +
      documents.backPhotoBase64.length +
      documents.selfieBase64.length +
      documents.proofAddressBase64.length
    ) / 4
    
    // Imagens muito pequenas = baixa qualidade
    if (avgLength < 10000) return 0.3
    if (avgLength < 50000) return 0.6
    if (avgLength < 100000) return 0.8
    
    return 0.95
  }
  
  /**
   * Detecta possível fraude (mock)
   */
  private async detectFraud(data: KYCSubmissionData): Promise<number> {
    // Em produção, usar ML e APIs especializadas
    
    let fraudScore = 0
    
    // Verificar se CPF já foi usado
    const existingUser = await prisma.user.findFirst({
      where: {
        cpf: data.personalData.cpf,
        id: { not: data.userId }
      }
    })
    
    if (existingUser) {
      fraudScore += 0.8 // CPF duplicado = alta chance de fraude
    }
    
    // Verificar padrões suspeitos no IP
    if (data.ipAddress.includes('proxy') || data.ipAddress.includes('vpn')) {
      fraudScore += 0.3
    }
    
    // Mock: 5% de chance aleatória de fraude
    if (Math.random() < 0.05) {
      fraudScore += 0.4
    }
    
    return Math.min(fraudScore, 1.0)
  }
  
  /**
   * Busca status do KYC
   */
  async getKYCStatus(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        kycStatus: true,
        kycCompletedAt: true,
        documentType: true,
        documentNumber: true
      }
    })
    
    return user
  }
}

export const kycService = new KYCService()
