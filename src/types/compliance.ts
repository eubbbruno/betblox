// BetBlox - Tipos para Compliance com Portaria SPA/MF Nº 2.104

export interface KYCData {
  // Dados pessoais obrigatórios
  cpf: string
  fullName: string
  birthDate: string
  phone: string
  email: string
  
  // Endereço obrigatório
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  
  // Documentos obrigatórios
  documents: {
    type: 'RG' | 'CNH' | 'PASSPORT'
    number: string
    frontPhoto: File | string
    backPhoto: File | string
    selfie: File | string
    proofOfAddress: File | string
  }
  
  // Status
  status: 'PENDING' | 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'EXPIRED'
  submittedAt?: string
  approvedAt?: string
  rejectedReason?: string
}

export interface ResponsibleGamingLimits {
  // Limites de depósito (obrigatórios)
  depositLimits: {
    daily?: number
    weekly?: number
    monthly?: number
  }
  
  // Limites de tempo (obrigatórios)
  timeLimits: {
    dailyMinutes?: number
    sessionMinutes?: number
  }
  
  // Auto-exclusão
  selfExclusion?: {
    type: 'TEMPORARY' | 'PERMANENT'
    until?: string
    reason?: string
    requestedAt: string
  }
  
  // Alertas
  alerts: {
    timeAlerts: boolean
    lossAlerts: boolean
    depositAlerts: boolean
  }
}

export interface TaxWithholding {
  transactionId: string
  userId: string
  grossAmount: number
  taxableAmount: number // Apenas se > R$ 2.000
  taxRate: number // 30%
  taxAmount: number
  netAmount: number
  withheldAt: string
}

export interface AuditLogEntry {
  id: string
  userId?: string
  action: string
  category: 'AUTH' | 'GAME' | 'PAYMENT' | 'COMPLIANCE' | 'SECURITY'
  details: Record<string, any>
  ipAddress: string
  userAgent: string
  endpoint?: string
  method?: string
  riskScore?: number
  flagged: boolean
  timestamp: string
}

export interface ComplianceReport {
  id: string
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY'
  period: {
    start: string
    end: string
  }
  
  // Métricas obrigatórias
  metrics: {
    totalUsers: number
    activeUsers: number
    newRegistrations: number
    kycApproved: number
    kycRejected: number
    
    // Financeiro
    totalDeposits: number
    totalWithdrawals: number
    totalBets: number
    totalWins: number
    grossGamingRevenue: number
    
    // Tributação
    totalTaxWithheld: number
    taxableTransactions: number
    
    // Jogo responsável
    selfExclusions: number
    limitBreaches: number
    supportTickets: number
    complaints: number
  }
  
  // Status
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED'
  submittedAt?: string
  approvedAt?: string
}

export interface PIXTransaction {
  id: string
  userId: string
  type: 'DEPOSIT' | 'WITHDRAWAL'
  amount: number
  fee: number
  netAmount: number
  
  // PIX específico
  pixKey: string
  pixKeyType: 'CPF' | 'EMAIL' | 'PHONE' | 'RANDOM'
  qrCode?: string
  txId?: string // ID da transação PIX
  
  // Status
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'EXPIRED'
  
  // Compliance
  ipAddress: string
  userAgent: string
  
  // Timestamps
  createdAt: string
  updatedAt: string
  completedAt?: string
  expiresAt?: string
}

export interface GameSessionCompliance {
  sessionId: string
  userId: string
  gameId: string
  providerId: string
  
  // RNG Compliance (obrigatório)
  rngData: {
    seed: string
    sequence: string[]
    algorithm: string
    certified: boolean
    certificationUrl?: string
  }
  
  // Sessão
  startedAt: string
  endedAt?: string
  duration?: number // segundos
  
  // Financeiro
  totalBets: number
  totalWins: number
  netResult: number
  
  // Auditoria
  ipAddress: string
  userAgent: string
}

export interface RiskAssessment {
  userId: string
  score: number // 0-100
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  
  factors: {
    rapidDeposits: boolean
    largeTransactions: boolean
    unusualPatterns: boolean
    multipleAccounts: boolean
    vpnUsage: boolean
    locationMismatch: boolean
  }
  
  actions: {
    requireAdditionalKYC: boolean
    limitTransactions: boolean
    flagForReview: boolean
    blockAccount: boolean
  }
  
  assessedAt: string
  reviewedAt?: string
  reviewedBy?: string
}

export interface ComplianceSettings {
  // KYC
  kyc: {
    required: boolean
    autoApprove: boolean
    maxAttempts: number
    expiryDays: number
  }
  
  // Limites padrão
  defaultLimits: {
    dailyDeposit: number
    weeklyDeposit: number
    monthlyDeposit: number
    dailyTime: number // minutos
  }
  
  // Tributação
  tax: {
    threshold: number // R$ 2.000
    rate: number // 30%
    autoWithhold: boolean
  }
  
  // Jogo responsável
  responsibleGaming: {
    mandatoryBreaks: boolean
    breakDuration: number // minutos
    lossAlertThreshold: number
    timeAlertInterval: number // minutos
  }
  
  // Auditoria
  audit: {
    logAllActions: boolean
    retentionYears: number // 5 anos obrigatório
    encryptLogs: boolean
  }
}
