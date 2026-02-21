// Tipos do BetBlox

export type GameCategory = 'SLOTS' | 'LIVE_CASINO' | 'TABLE_GAMES' | 'CRASH' | 'INSTANT_WIN' | 'SPORTS';

export type SessionStatus = 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'CANCELLED';

export type TransactionType = 'BET' | 'WIN' | 'REFUND' | 'BONUS' | 'DEPOSIT' | 'WITHDRAWAL';

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface Game {
  id: string;
  name: string;
  slug: string;
  category: GameCategory;
  provider: string;
  thumbnail: string;
  isActive: boolean;
  minBet: number;
  maxBet: number;
  rtp: number;
  volatility: 'LOW' | 'MEDIUM' | 'HIGH';
  features: string[];
  isPopular?: boolean;
  isHot?: boolean;
  isNew?: boolean;
}

export interface GameProvider {
  id: string;
  name: string;
  slug: string;
  logo: string;
  isActive: boolean;
}

export interface GameSession {
  id: string;
  gameId: string;
  userId: string;
  status: SessionStatus;
  startedAt: Date;
  endedAt?: Date;
  totalBet: number;
  totalWin: number;
  profit: number;
}

export interface Transaction {
  id: string;
  sessionId?: string;
  userId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  balance: number;
  description: string;
  createdAt: Date;
  processedAt?: Date;
}

export interface User {
  id: string;
  email: string;
  username: string;
  balance: number;
  isActive: boolean;
  createdAt: Date;
}

// API Types
export interface LaunchGameRequest {
  gameId: string;
  userId: string;
  returnUrl: string;
}

export interface LaunchGameResponse {
  success: boolean;
  gameUrl?: string;
  sessionId?: string;
  error?: string;
}

export interface GameListResponse {
  success: boolean;
  games: Game[];
  total: number;
}

export interface BalanceResponse {
  success: boolean;
  balance: number;
  currency: string;
}
