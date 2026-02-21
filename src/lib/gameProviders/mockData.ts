import { Game, GameProvider, GameCategory } from '@/types/game';

// Definindo as categorias como constantes
export const GameCategories = {
  SLOTS: 'SLOTS' as const,
  LIVE_CASINO: 'LIVE_CASINO' as const,
  TABLE_GAMES: 'TABLE_GAMES' as const,
  CRASH: 'CRASH' as const,
  INSTANT_WIN: 'INSTANT_WIN' as const,
  SPORTS: 'SPORTS' as const,
};

export const mockProviders: GameProvider[] = [
  {
    id: 'pragmatic',
    name: 'Pragmatic Play',
    slug: 'pragmatic-play',
    logo: '/providers/pragmatic.png',
    isActive: true,
  },
  {
    id: 'pgsoft',
    name: 'PG Soft',
    slug: 'pg-soft',
    logo: '/providers/pgsoft.png',
    isActive: true,
  },
  {
    id: 'evolution',
    name: 'Evolution Gaming',
    slug: 'evolution-gaming',
    logo: '/providers/evolution.png',
    isActive: true,
  },
  {
    id: 'hacksaw',
    name: 'Hacksaw Gaming',
    slug: 'hacksaw-gaming',
    logo: '/providers/hacksaw.png',
    isActive: true,
  },
];

export const mockGames: Game[] = [
  // SLOTS - Pragmatic Play
  {
    id: 'fortune-tiger',
    name: 'Fortune Tiger',
    slug: 'fortune-tiger',
    category: GameCategories.SLOTS,
    provider: 'Pragmatic Play',
    thumbnail: '/games/fortune-tiger.jpg',
    isActive: true,
    minBet: 0.20,
    maxBet: 100.00,
    rtp: 96.81,
    volatility: 'MEDIUM',
    features: ['Free Spins', 'Multipliers', 'Wild Symbols'],
    isPopular: true,
    isHot: true,
  },
  {
    id: 'sweet-bonanza',
    name: 'Sweet Bonanza',
    slug: 'sweet-bonanza',
    category: GameCategories.SLOTS,
    provider: 'Pragmatic Play',
    thumbnail: '/games/sweet-bonanza.jpg',
    isActive: true,
    minBet: 0.20,
    maxBet: 125.00,
    rtp: 96.51,
    volatility: 'HIGH',
    features: ['Tumble Feature', 'Free Spins', 'Multipliers'],
    isPopular: true,
  },
  {
    id: 'gates-of-olympus',
    name: 'Gates of Olympus',
    slug: 'gates-of-olympus',
    category: GameCategories.SLOTS,
    provider: 'Pragmatic Play',
    thumbnail: '/games/gates-olympus.jpg',
    isActive: true,
    minBet: 0.20,
    maxBet: 125.00,
    rtp: 96.50,
    volatility: 'HIGH',
    features: ['Multipliers', 'Free Spins', 'Tumble'],
    isHot: true,
  },

  // SLOTS - PG Soft
  {
    id: 'fortune-ox',
    name: 'Fortune Ox',
    slug: 'fortune-ox',
    category: GameCategories.SLOTS,
    provider: 'PG Soft',
    thumbnail: '/games/fortune-ox.jpg',
    isActive: true,
    minBet: 0.08,
    maxBet: 80.00,
    rtp: 96.75,
    volatility: 'MEDIUM',
    features: ['Respin', 'Fortune Symbols'],
    isPopular: true,
  },
  {
    id: 'fortune-mouse',
    name: 'Fortune Mouse',
    slug: 'fortune-mouse',
    category: GameCategories.SLOTS,
    provider: 'PG Soft',
    thumbnail: '/games/fortune-mouse.jpg',
    isActive: true,
    minBet: 0.08,
    maxBet: 80.00,
    rtp: 96.97,
    volatility: 'MEDIUM',
    features: ['Money Collect', 'Multipliers'],
    isNew: true,
  },

  // CRASH GAMES
  {
    id: 'aviator',
    name: 'Aviator',
    slug: 'aviator',
    category: GameCategories.CRASH,
    provider: 'Spribe',
    thumbnail: '/games/aviator.jpg',
    isActive: true,
    minBet: 1.00,
    maxBet: 500.00,
    rtp: 97.00,
    volatility: 'HIGH',
    features: ['Auto Cashout', 'Live Multiplier', 'Statistics'],
    isPopular: true,
    isHot: true,
  },

  // LIVE CASINO
  {
    id: 'crazy-time',
    name: 'Crazy Time',
    slug: 'crazy-time',
    category: GameCategories.LIVE_CASINO,
    provider: 'Evolution Gaming',
    thumbnail: '/games/crazy-time.jpg',
    isActive: true,
    minBet: 0.10,
    maxBet: 500.00,
    rtp: 96.08,
    volatility: 'HIGH',
    features: ['Live Dealers', 'Bonus Rounds', 'Wheel of Fortune'],
    isPopular: true,
  },
  {
    id: 'lightning-roulette',
    name: 'Lightning Roulette',
    slug: 'lightning-roulette',
    category: GameCategories.LIVE_CASINO,
    provider: 'Evolution Gaming',
    thumbnail: '/games/lightning-roulette.jpg',
    isActive: true,
    minBet: 0.20,
    maxBet: 500.00,
    rtp: 97.30,
    volatility: 'MEDIUM',
    features: ['Live Dealers', 'Lightning Multipliers', 'Statistics'],
  },

  // TABLE GAMES
  {
    id: 'blackjack-classic',
    name: 'Blackjack Classic',
    slug: 'blackjack-classic',
    category: GameCategories.TABLE_GAMES,
    provider: 'NetEnt',
    thumbnail: '/games/blackjack.jpg',
    isActive: true,
    minBet: 1.00,
    maxBet: 100.00,
    rtp: 99.28,
    volatility: 'LOW',
    features: ['Double Down', 'Split', 'Insurance'],
  },

  // INSTANT WIN
  {
    id: 'mines',
    name: 'Mines',
    slug: 'mines',
    category: GameCategories.INSTANT_WIN,
    provider: 'Hacksaw Gaming',
    thumbnail: '/games/mines.jpg',
    isActive: true,
    minBet: 0.10,
    maxBet: 100.00,
    rtp: 97.00,
    volatility: 'HIGH',
    features: ['Risk Selection', 'Auto Play', 'Statistics'],
    isHot: true,
  },
];

// Função para buscar jogos por categoria
export function getGamesByCategory(category: GameCategory): Game[] {
  return mockGames.filter(game => game.category === category);
}

// Função para buscar jogos populares
export function getPopularGames(): Game[] {
  return mockGames.filter(game => game.isPopular);
}

// Função para buscar jogos quentes
export function getHotGames(): Game[] {
  return mockGames.filter(game => game.isHot);
}

// Função para buscar jogos novos
export function getNewGames(): Game[] {
  return mockGames.filter(game => game.isNew);
}
