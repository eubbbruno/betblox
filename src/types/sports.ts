export type SportType = 'FUTEBOL' | 'BASQUETE' | 'TENIS' | 'VOLEI' | 'ESPORTS'

export type MarketType = 
  | 'RESULTADO_FINAL' // 1X2
  | 'DUPLA_CHANCE' // 1X, X2, 12
  | 'AMBAS_MARCAM' // Sim/Não
  | 'TOTAL_GOLS' // Over/Under
  | 'HANDICAP_ASIATICO'
  | 'PRIMEIRO_TEMPO'
  | 'ESCANTEIOS'
  | 'CARTOES'

export interface Team {
  id: string
  name: string
  logo: string
  country: string
}

export interface League {
  id: string
  name: string
  country: string
  logo: string
  sport: SportType
}

export interface Market {
  id: string
  type: MarketType
  name: string
  options: MarketOption[]
}

export interface MarketOption {
  id: string
  name: string
  odd: number
  isActive: boolean
}

export interface Match {
  id: string
  league: League
  homeTeam: Team
  awayTeam: Team
  startTime: string
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED'
  score?: {
    home: number
    away: number
  }
  liveTime?: string
  markets: Market[]
  isLive: boolean
  isFeatured: boolean
}

export interface Bet {
  id: string
  matchId: string
  marketId: string
  optionId: string
  stake: number
  odd: number
  potentialWin: number
  status: 'PENDING' | 'WON' | 'LOST' | 'VOID'
  placedAt: string
}

export interface BetSlip {
  bets: {
    matchId: string
    marketId: string
    optionId: string
    odd: number
    matchInfo: string
    marketInfo: string
    optionInfo: string
  }[]
  totalStake: number
  totalOdds: number
  potentialWin: number
}
