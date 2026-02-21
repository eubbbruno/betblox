import { Match, League, Team, SportType } from '@/types/sports'

// Times brasileiros e internacionais
export const teams: Team[] = [
  // Brasileirão
  { id: '1', name: 'Flamengo', logo: '🔴⚫', country: 'Brasil' },
  { id: '2', name: 'Palmeiras', logo: '🟢⚪', country: 'Brasil' },
  { id: '3', name: 'Corinthians', logo: '⚫⚪', country: 'Brasil' },
  { id: '4', name: 'São Paulo', logo: '🔴⚫⚪', country: 'Brasil' },
  { id: '5', name: 'Santos', logo: '⚪⚫', country: 'Brasil' },
  { id: '6', name: 'Vasco', logo: '⚫⚪', country: 'Brasil' },
  
  // Internacional
  { id: '7', name: 'Real Madrid', logo: '⚪', country: 'Espanha' },
  { id: '8', name: 'Barcelona', logo: '🔴🔵', country: 'Espanha' },
  { id: '9', name: 'Manchester City', logo: '🔵⚪', country: 'Inglaterra' },
  { id: '10', name: 'PSG', logo: '🔴🔵', country: 'França' },
  { id: '11', name: 'Bayern Munich', logo: '🔴⚪', country: 'Alemanha' },
  { id: '12', name: 'Liverpool', logo: '🔴', country: 'Inglaterra' },
]

// Ligas
export const leagues: League[] = [
  { id: '1', name: 'Brasileirão Série A', country: 'Brasil', logo: '🇧🇷', sport: 'FUTEBOL' },
  { id: '2', name: 'Champions League', country: 'Europa', logo: '🏆', sport: 'FUTEBOL' },
  { id: '3', name: 'Premier League', country: 'Inglaterra', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', sport: 'FUTEBOL' },
  { id: '4', name: 'La Liga', country: 'Espanha', logo: '🇪🇸', sport: 'FUTEBOL' },
  { id: '5', name: 'NBA', country: 'EUA', logo: '🏀', sport: 'BASQUETE' },
  { id: '6', name: 'CS:GO Major', country: 'Mundial', logo: '🎮', sport: 'ESPORTS' },
]

// Partidas mock com odds realistas
export const mockMatches: Match[] = [
  {
    id: '1',
    league: leagues[0],
    homeTeam: teams[0], // Flamengo
    awayTeam: teams[1], // Palmeiras
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2h no futuro
    status: 'SCHEDULED',
    isLive: false,
    isFeatured: true,
    markets: [
      {
        id: '1-1',
        type: 'RESULTADO_FINAL',
        name: 'Resultado Final',
        options: [
          { id: '1-1-1', name: 'Flamengo', odd: 2.10, isActive: true },
          { id: '1-1-2', name: 'Empate', odd: 3.40, isActive: true },
          { id: '1-1-3', name: 'Palmeiras', odd: 3.20, isActive: true }
        ]
      },
      {
        id: '1-2',
        type: 'TOTAL_GOLS',
        name: 'Total de Gols',
        options: [
          { id: '1-2-1', name: 'Mais de 2.5', odd: 1.85, isActive: true },
          { id: '1-2-2', name: 'Menos de 2.5', odd: 1.95, isActive: true }
        ]
      },
      {
        id: '1-3',
        type: 'AMBAS_MARCAM',
        name: 'Ambas Marcam',
        options: [
          { id: '1-3-1', name: 'Sim', odd: 1.70, isActive: true },
          { id: '1-3-2', name: 'Não', odd: 2.10, isActive: true }
        ]
      }
    ]
  },
  {
    id: '2',
    league: leagues[0],
    homeTeam: teams[2], // Corinthians
    awayTeam: teams[3], // São Paulo
    startTime: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // 1h no futuro
    status: 'SCHEDULED',
    isLive: false,
    isFeatured: true,
    markets: [
      {
        id: '2-1',
        type: 'RESULTADO_FINAL',
        name: 'Resultado Final',
        options: [
          { id: '2-1-1', name: 'Corinthians', odd: 2.45, isActive: true },
          { id: '2-1-2', name: 'Empate', odd: 3.10, isActive: true },
          { id: '2-1-3', name: 'São Paulo', odd: 2.80, isActive: true }
        ]
      }
    ]
  },
  {
    id: '3',
    league: leagues[1], // Champions League
    homeTeam: teams[6], // Real Madrid
    awayTeam: teams[7], // Barcelona
    startTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30min no futuro
    status: 'LIVE',
    score: { home: 1, away: 0 },
    liveTime: '67\'',
    isLive: true,
    isFeatured: true,
    markets: [
      {
        id: '3-1',
        type: 'RESULTADO_FINAL',
        name: 'Resultado Final',
        options: [
          { id: '3-1-1', name: 'Real Madrid', odd: 1.95, isActive: true },
          { id: '3-1-2', name: 'Empate', odd: 3.60, isActive: true },
          { id: '3-1-3', name: 'Barcelona', odd: 3.80, isActive: true }
        ]
      },
      {
        id: '3-2',
        type: 'TOTAL_GOLS',
        name: 'Total de Gols',
        options: [
          { id: '3-2-1', name: 'Mais de 1.5', odd: 1.40, isActive: true },
          { id: '3-2-2', name: 'Menos de 1.5', odd: 2.85, isActive: true }
        ]
      }
    ]
  },
  {
    id: '4',
    league: leagues[2], // Premier League
    homeTeam: teams[8], // Manchester City
    awayTeam: teams[11], // Liverpool
    startTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    status: 'SCHEDULED',
    isLive: false,
    isFeatured: true,
    markets: [
      {
        id: '4-1',
        type: 'RESULTADO_FINAL',
        name: 'Resultado Final',
        options: [
          { id: '4-1-1', name: 'Manchester City', odd: 1.75, isActive: true },
          { id: '4-1-2', name: 'Empate', odd: 3.80, isActive: true },
          { id: '4-1-3', name: 'Liverpool', odd: 4.20, isActive: true }
        ]
      }
    ]
  },
  {
    id: '5',
    league: leagues[4], // NBA
    homeTeam: { id: '13', name: 'Lakers', logo: '🟡🟣', country: 'EUA' },
    awayTeam: { id: '14', name: 'Warriors', logo: '🔵🟡', country: 'EUA' },
    startTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    status: 'SCHEDULED',
    isLive: false,
    isFeatured: false,
    markets: [
      {
        id: '5-1',
        type: 'RESULTADO_FINAL',
        name: 'Vencedor',
        options: [
          { id: '5-1-1', name: 'Lakers', odd: 2.20, isActive: true },
          { id: '5-1-2', name: 'Warriors', odd: 1.65, isActive: true }
        ]
      }
    ]
  }
]

// Função para simular mudanças de odds em tempo real
export function updateLiveOdds(matches: Match[]): Match[] {
  return matches.map(match => {
    if (match.isLive) {
      return {
        ...match,
        markets: match.markets.map(market => ({
          ...market,
          options: market.options.map(option => ({
            ...option,
            odd: Math.max(1.01, option.odd + (Math.random() - 0.5) * 0.1)
          }))
        }))
      }
    }
    return match
  })
}

// Estatísticas para dashboard
export const sportsStats = {
  totalMatches: mockMatches.length,
  liveMatches: mockMatches.filter(m => m.isLive).length,
  featuredMatches: mockMatches.filter(m => m.isFeatured).length,
  sportsAvailable: leagues.length,
  avgOdds: 2.45,
  highestOdd: 4.20
}
