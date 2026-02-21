'use client'

import { useState } from 'react'

interface Game {
  id: number
  name: string
  provider: string
  category: string
  thumbnail: string
  rtp: number
  maxWin: string
  isHot: boolean
  isNew: boolean
  players: number
}

const mockGames: Game[] = [
  {
    id: 1,
    name: "Fortune Tiger",
    provider: "PG Soft",
    category: "SLOTS",
    thumbnail: "🐅",
    rtp: 96.81,
    maxWin: "2500x",
    isHot: true,
    isNew: false,
    players: 2847
  },
  {
    id: 2,
    name: "Sweet Bonanza",
    provider: "Pragmatic Play",
    category: "SLOTS", 
    thumbnail: "🍭",
    rtp: 96.51,
    maxWin: "21100x",
    isHot: true,
    isNew: false,
    players: 1923
  },
  {
    id: 3,
    name: "Aviator",
    provider: "Spribe",
    category: "CRASH",
    thumbnail: "✈️",
    rtp: 97.00,
    maxWin: "∞",
    isHot: true,
    isNew: false,
    players: 3456
  },
  {
    id: 4,
    name: "Gates of Olympus",
    provider: "Pragmatic Play", 
    category: "SLOTS",
    thumbnail: "⚡",
    rtp: 96.50,
    maxWin: "5000x",
    isHot: false,
    isNew: true,
    players: 1567
  },
  {
    id: 5,
    name: "Crazy Time",
    provider: "Evolution Gaming",
    category: "LIVE",
    thumbnail: "🎪",
    rtp: 96.08,
    maxWin: "20000x",
    isHot: true,
    isNew: false,
    players: 4231
  },
  {
    id: 6,
    name: "Mines",
    provider: "Spribe",
    category: "CRASH",
    thumbnail: "💎",
    rtp: 97.00,
    maxWin: "10000x",
    isHot: false,
    isNew: true,
    players: 892
  },
  {
    id: 7,
    name: "Lightning Roulette",
    provider: "Evolution Gaming",
    category: "LIVE",
    thumbnail: "⚡",
    rtp: 97.30,
    maxWin: "500x",
    isHot: false,
    isNew: false,
    players: 756
  },
  {
    id: 8,
    name: "Big Bass Bonanza",
    provider: "Pragmatic Play",
    category: "SLOTS",
    thumbnail: "🎣",
    rtp: 96.71,
    maxWin: "2100x",
    isHot: true,
    isNew: false,
    players: 1834
  }
]

export default function CassinoPage() {
  const [selectedCategory, setSelectedCategory] = useState('TODOS')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['TODOS', 'SLOTS', 'CRASH', 'LIVE']

  const filteredGames = mockGames.filter(game => {
    const matchesCategory = selectedCategory === 'TODOS' || game.category === selectedCategory
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0b 0%, #581c87 25%, #1e3a8a 50%, #312e81 75%, #0a0a0b 100%)',
      color: 'white',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid rgba(139, 92, 246, 0.3)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="/" style={{
              fontSize: '28px',
              fontWeight: '900',
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none'
            }}>
              BETBLOX
            </a>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(139, 92, 246, 0.3))',
            padding: '12px 20px',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            fontWeight: 'bold'
          }}>
            💰 R$ 50.000,00
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Título da Página */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '900',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
            textShadow: '0 0 30px rgba(245, 158, 11, 0.5)'
          }}>
            🎰 CASSINO PREMIUM
          </h1>
          <p style={{ fontSize: '20px', color: '#a78bfa', marginBottom: '32px' }}>
            Os melhores jogos dos provedores mais confiáveis do mundo
          </p>
        </div>

        {/* Filtros */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: selectedCategory === category 
                  ? '2px solid #fbbf24' 
                  : '2px solid rgba(139, 92, 246, 0.3)',
                background: selectedCategory === category
                  ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                  : 'rgba(139, 92, 246, 0.2)',
                color: selectedCategory === category ? '#000' : '#fff',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              onMouseOver={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.4)'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
                  e.currentTarget.style.transform = 'scale(1)'
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Jogos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {filteredGames.map(game => (
            <div
              key={game.id}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(139, 92, 246, 0.1))',
                borderRadius: '20px',
                padding: '24px',
                border: '2px solid rgba(139, 92, 246, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.03) translateY(-5px)'
                e.currentTarget.style.border = '2px solid rgba(245, 158, 11, 0.6)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)'
                e.currentTarget.style.border = '2px solid rgba(139, 92, 246, 0.2)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              onClick={() => window.location.href = `/jogo?id=${game.id}`}
            >
              {/* Badges */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {game.isHot && (
                  <div style={{
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    animation: 'pulse 2s infinite'
                  }}>
                    🔥 HOT
                  </div>
                )}
                {game.isNew && (
                  <div style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    ✨ NEW
                  </div>
                )}
              </div>

              {/* Thumbnail */}
              <div style={{
                fontSize: '64px',
                textAlign: 'center',
                marginBottom: '16px',
                filter: 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.5))'
              }}>
                {game.thumbnail}
              </div>

              {/* Info do Jogo */}
              <div style={{ textAlign: 'center' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '900',
                  marginBottom: '8px',
                  color: '#fff'
                }}>
                  {game.name}
                </h3>
                
                <p style={{
                  fontSize: '14px',
                  color: '#a78bfa',
                  marginBottom: '16px',
                  fontWeight: '600'
                }}>
                  {game.provider}
                </p>

                {/* Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>RTP</div>
                    <div style={{ fontSize: '14px', color: '#fff', fontWeight: '900' }}>{game.rtp}%</div>
                  </div>
                  <div style={{
                    background: 'rgba(245, 158, 11, 0.2)',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid rgba(245, 158, 11, 0.3)'
                  }}>
                    <div style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 'bold' }}>MAX WIN</div>
                    <div style={{ fontSize: '14px', color: '#fff', fontWeight: '900' }}>{game.maxWin}</div>
                  </div>
                </div>

                {/* Players Online */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>
                    {game.players.toLocaleString()} jogando
                  </span>
                </div>

                {/* Botão Jogar */}
                <button style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  color: '#000',
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.5)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                >
                  🎮 JOGAR AGORA
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé da Página */}
        <div style={{
          textAlign: 'center',
          padding: '40px 0',
          borderTop: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <p style={{ color: '#a78bfa', fontSize: '14px' }}>
            🎰 Mais jogos serão adicionados em breve! Fique ligado!
          </p>
        </div>
      </div>
    </div>
  )
}