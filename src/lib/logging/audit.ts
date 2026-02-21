// BetBlox - Sistema de Auditoria Compliant (5 anos obrigatório)
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import pino from 'pino'

const prisma = new PrismaClient()

// Logger estruturado para auditoria
const auditLogger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label }),
  },
  redact: {
    paths: ['password', 'token', 'secret', 'key'],
    censor: '[REDACTED]'
  }
})

export interface AuditLogData {
  userId?: string
  action: string
  category: 'AUTH' | 'GAME' | 'PAYMENT' | 'COMPLIANCE' | 'SECURITY' | 'ADMIN'
  details: Record<string, any>
  ipAddress: string
  userAgent: string
  endpoint?: string
  method?: string
  riskScore?: number
}

/**
 * Sistema de auditoria compliant com Portaria SPA/MF
 * OBRIGATÓRIO: Manter logs por 5 anos
 */
export class AuditService {
  
  /**
   * Registra ação no log de auditoria
   */
  async log(data: AuditLogData): Promise<string> {
    try {
      // Calcular score de risco se não fornecido
      const riskScore = data.riskScore || this.calculateRiskScore(data)
      
      // Determinar se deve ser flagged
      const flagged = this.shouldFlag(data, riskScore)
      
      // Criar hash dos detalhes para integridade
      const detailsHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(data.details))
        .digest('hex')
      
      // Salvar no banco (permanente - 5 anos)
      const auditLog = await prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          category: data.category,
          details: JSON.stringify({
            ...data.details,
            _hash: detailsHash,
            _timestamp: new Date().toISOString()
          }),
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          endpoint: data.endpoint,
          method: data.method,
          riskScore,
          flagged
        }
      })
      
      // Log estruturado para arquivo
      auditLogger.info({
        auditId: auditLog.id,
        userId: data.userId,
        action: data.action,
        category: data.category,
        riskScore,
        flagged,
        ipAddress: data.ipAddress,
        details: data.details
      }, `AUDIT: ${data.action}`)
      
      // Se flagged, alertar sistema de compliance
      if (flagged) {
        await this.handleFlaggedActivity(auditLog.id, data)
      }
      
      return auditLog.id
      
    } catch (error) {
      console.error('Erro no sistema de auditoria:', error)
      
      // Log de emergência em arquivo (nunca falhar)
      auditLogger.error({
        error: error instanceof Error ? error.message : 'Unknown error',
        originalData: data
      }, 'AUDIT_SYSTEM_ERROR')
      
      throw error
    }
  }
  
  /**
   * Busca logs de auditoria com filtros
   */
  async getLogs(filters: {
    userId?: string
    action?: string
    category?: string
    flagged?: boolean
    startDate?: Date
    endDate?: Date
    limit?: number
    offset?: number
  }) {
    return await prisma.auditLog.findMany({
      where: {
        userId: filters.userId,
        action: filters.action,
        category: filters.category,
        flagged: filters.flagged,
        createdAt: {
          gte: filters.startDate,
          lte: filters.endDate
        }
      },
      orderBy: { createdAt: 'desc' },
      take: filters.limit || 100,
      skip: filters.offset || 0,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            cpf: true,
            fullName: true
          }
        }
      }
    })
  }
  
  /**
   * Gera relatório de compliance
   */
  async generateComplianceReport(period: {
    start: Date
    end: Date
  }) {
    const logs = await prisma.auditLog.findMany({
      where: {
        createdAt: {
          gte: period.start,
          lte: period.end
        }
      }
    })
    
    // Agregar métricas por categoria
    const metrics = logs.reduce((acc, log) => {
      if (!acc[log.category]) {
        acc[log.category] = {
          total: 0,
          flagged: 0,
          actions: {}
        }
      }
      
      acc[log.category].total++
      
      if (log.flagged) {
        acc[log.category].flagged++
      }
      
      if (!acc[log.category].actions[log.action]) {
        acc[log.category].actions[log.action] = 0
      }
      acc[log.category].actions[log.action]++
      
      return acc
    }, {} as Record<string, any>)
    
    // Usuários únicos
    const uniqueUsers = new Set(logs.filter(l => l.userId).map(l => l.userId)).size
    
    // Ações de alto risco
    const highRiskActions = logs.filter(l => (l.riskScore || 0) > 70).length
    
    return {
      period,
      summary: {
        totalLogs: logs.length,
        uniqueUsers,
        flaggedLogs: logs.filter(l => l.flagged).length,
        highRiskActions
      },
      metrics,
      generatedAt: new Date().toISOString()
    }
  }
  
  /**
   * Calcula score de risco da ação
   */
  private calculateRiskScore(data: AuditLogData): number {
    let score = 0
    
    // Ações de alto risco
    const highRiskActions = [
      'LOGIN_FAILED_MULTIPLE',
      'LARGE_TRANSACTION',
      'RAPID_DEPOSITS',
      'UNUSUAL_BETTING_PATTERN',
      'VPN_DETECTED',
      'MULTIPLE_ACCOUNTS',
      'CHARGEBACK_RECEIVED'
    ]
    
    if (highRiskActions.includes(data.action)) {
      score += 50
    }
    
    // Categoria de risco
    switch (data.category) {
      case 'SECURITY':
        score += 30
        break
      case 'PAYMENT':
        score += 20
        break
      case 'COMPLIANCE':
        score += 15
        break
    }
    
    // Análise dos detalhes
    if (data.details.amount && data.details.amount > 10000) {
      score += 25 // Transações altas
    }
    
    if (data.details.vpn || data.details.proxy) {
      score += 30 // VPN/Proxy
    }
    
    if (data.details.multipleAttempts && data.details.multipleAttempts > 5) {
      score += 20 // Múltiplas tentativas
    }
    
    return Math.min(score, 100) // Max 100
  }
  
  /**
   * Determina se ação deve ser flagged
   */
  private shouldFlag(data: AuditLogData, riskScore: number): boolean {
    // Auto-flag por score alto
    if (riskScore >= 70) return true
    
    // Ações sempre flagged
    const alwaysFlagActions = [
      'ACCOUNT_LOCKED',
      'FRAUD_DETECTED',
      'CHARGEBACK_RECEIVED',
      'COMPLIANCE_VIOLATION',
      'SELF_EXCLUSION_BREACH'
    ]
    
    return alwaysFlagActions.includes(data.action)
  }
  
  /**
   * Processa atividade flagged
   */
  private async handleFlaggedActivity(auditId: string, data: AuditLogData) {
    try {
      // Notificar equipe de compliance
      console.warn(`ATIVIDADE FLAGGED: ${data.action}`, {
        auditId,
        userId: data.userId,
        category: data.category,
        riskScore: data.riskScore
      })
      
      // Se for atividade crítica, bloquear usuário temporariamente
      const criticalActions = [
        'FRAUD_DETECTED',
        'MULTIPLE_ACCOUNTS',
        'CHARGEBACK_RECEIVED'
      ]
      
      if (criticalActions.includes(data.action) && data.userId) {
        await this.temporaryLockUser(data.userId, data.action)
      }
      
      // Criar ticket de compliance automático
      if (data.userId) {
        await prisma.supportTicket.create({
          data: {
            userId: data.userId,
            subject: `Atividade Flagged: ${data.action}`,
            message: `Sistema detectou atividade suspeita. Audit ID: ${auditId}`,
            category: 'COMPLIANCE',
            priority: 'HIGH',
            status: 'OPEN',
            isComplaint: false
          }
        })
      }
      
    } catch (error) {
      console.error('Erro ao processar atividade flagged:', error)
    }
  }
  
  /**
   * Bloqueia usuário temporariamente
   */
  private async temporaryLockUser(userId: string, reason: string) {
    const lockUntil = new Date()
    lockUntil.setHours(lockUntil.getHours() + 24) // 24h de bloqueio
    
    await prisma.user.update({
      where: { id: userId },
      data: {
        lockedUntil: lockUntil
      }
    })
    
    // Log do bloqueio
    await this.log({
      userId,
      action: 'USER_TEMPORARILY_LOCKED',
      category: 'SECURITY',
      details: {
        reason,
        lockedUntil: lockUntil.toISOString(),
        automatic: true
      },
      ipAddress: '0.0.0.0',
      userAgent: 'system'
    })
  }
  
  /**
   * Verifica integridade dos logs
   */
  async verifyLogIntegrity(auditId: string): Promise<boolean> {
    try {
      const log = await prisma.auditLog.findUnique({
        where: { id: auditId }
      })
      
      if (!log) return false
      
      const details = JSON.parse(log.details)
      const { _hash, ...originalDetails } = details
      
      const expectedHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(originalDetails))
        .digest('hex')
      
      return _hash === expectedHash
      
    } catch (error) {
      console.error('Erro na verificação de integridade:', error)
      return false
    }
  }
}

// Instância singleton
export const auditService = new AuditService()

// Helper function para uso direto
export async function auditLog(data: AuditLogData): Promise<string> {
  return await auditService.log(data)
}

// Middleware para Express/Next.js
export function auditMiddleware(action: string, category: AuditLogData['category']) {
  return async (req: any, res: any, next: any) => {
    try {
      const userId = req.user?.id || req.session?.userId
      
      await auditLog({
        userId,
        action,
        category,
        details: {
          method: req.method,
          url: req.url,
          body: req.body,
          query: req.query,
          params: req.params
        },
        ipAddress: req.ip || req.connection.remoteAddress || '0.0.0.0',
        userAgent: req.get('User-Agent') || 'unknown',
        endpoint: req.url,
        method: req.method
      })
      
      next()
      
    } catch (error) {
      console.error('Erro no middleware de auditoria:', error)
      next() // Não bloquear requisição por erro de auditoria
    }
  }
}
