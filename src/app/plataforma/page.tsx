'use client'

import { useState, useEffect } from 'react'
import { mockMatches, updateLiveOdds } from '@/lib/sportsData/mockSports'
import { Match } from '@/types/sports'
import MainLayout from '@/components/layout/MainLayout'

// Jogos do cassino (simplificado)
const casinoGames = [
  { id: 1, name: 'Fortune Tiger', emoji: '🐅', category: 'SLOTS', players: 2847, hot: true },
  { id: 2, name: 'Sweet Bonanza', emoji: '🍭', category: 'SLOTS', players: 1923, hot: true },
  { id: 3, name: 'Aviator', emoji: '✈️', category: 'CRASH', players: 3456, hot: true },
  { id: 4, name: 'Crazy Time', emoji: '🎪', category: 'LIVE', players: 4231, hot: false },
  { id: 5, name: 'Gates of Olympus', emoji: '⚡', category: 'SLOTS', players: 1567, new: true },
  { id: 6, name: 'Mines', emoji: '💎', category: 'CRASH', players: 892, new: true }
]

export default function PlataformaPage() {
  const [activeTab, setActiveTab] = useState<'ESPORTES' | 'CASSINO' | 'AO_VIVO'>('ESPORTES')
  const [matches, setMatches] = useState<Match[]>(mockMatches)
  const [selectedSport, setSelectedSport] = useState('TODOS')

  // Atualizar odds em tempo real para jogos ao vivo
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prevMatches => updateLiveOdds(prevMatches))
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const sports = ['TODOS', 'FUTEBOL', 'BASQUETE', 'TENIS', 'ESPORTS']
  
  const filteredMatches = matches.filter(match => 
    selectedSport === 'TODOS' || match.league.sport === selectedSport
  )

  const liveMatches = matches.filter(match => match.isLive)
  const featuredMatches = matches.filter(match => match.isFeatured)

  return (
    <MainLayout>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        {/* Tabs de Navegação */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '16px',
          padding: '8px',
          marginBottom: '32px',
          justifyContent: 'center',
          border: '2px solid rgba(139, 92, 246, 0.2)'
        }}>
          {(['ESPORTES', 'CASSINO', 'AO_VIVO'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === tab 
                  ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' 
                  : 'transparent',
                color: activeTab === tab ? 'white' : '#a78bfa',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '16px',
                minWidth: '150px'
              }}
              onMouseOver={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
                  e.currentTarget.style.color = '#fff'
                }
              }}
              onMouseOut={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#a78bfa'
                }
              }}
            >
              {tab === 'AO_VIVO' && '🔴 '}
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        {activeTab === 'ESPORTES' && (
          <div>
            {/* Stats Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#ef4444' }}>
                  {liveMatches.length}
                </div>
                <div style={{ fontSize: '12px', color: '#fca5a5', fontWeight: 'bold' }}>
                  🔴 AO VIVO
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.2))',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#fbbf24' }}>
                  {featuredMatches.length}
                </div>
                <div style={{ fontSize: '12px', color: '#fcd34d', fontWeight: 'bold' }}>
                  ⭐ DESTAQUE
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#8b5cf6' }}>
                  {matches.length}
                </div>
                <div style={{ fontSize: '12px', color: '#c4b5fd', fontWeight: 'bold' }}>
                  📊 TOTAL
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#10b981' }}>
                  2.45
                </div>
                <div style={{ fontSize: '12px', color: '#6ee7b7', fontWeight: 'bold' }}>
                  📈 ODD MÉDIA
                </div>
              </div>
            </div>

            {/* Filtros de Esporte */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '24px',
              flexWrap: 'wrap'
            }}>
              {sports.map(sport => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: selectedSport === sport 
                      ? '2px solid #fbbf24' 
                      : '1px solid rgba(139, 92, 246, 0.3)',
                    background: selectedSport === sport
                      ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                      : 'rgba(139, 92, 246, 0.1)',
                    color: selectedSport === sport ? '#000' : '#fff',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {sport}
                </button>
              ))}
            </div>

            {/* Lista de Jogos */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {filteredMatches.map(match => (
                <div
                  key={match.id}
                  style={{
                    background: 'linear-gradient(135deg, rgba(26, 26, 27, 0.8), rgba(0, 0, 0, 0.4))',
                    borderRadius: '16px',
                    padding: '20px',
                    border: match.isLive 
                      ? '2px solid rgba(239, 68, 68, 0.5)' 
                      : '1px solid rgba(139, 92, 246, 0.2)',
                    position: 'relative'
                  }}
                >
                  {/* Status Badge */}
                  {match.isLive && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#ef4444',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      animation: 'pulse 2s infinite'
                    }}>
                      🔴 AO VIVO {match.liveTime}
                    </div>
                  )}

                  {/* Info da Partida */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '12px',
                        color: '#a78bfa',
                        fontWeight: 'bold',
                        marginBottom: '4px'
                      }}>
                        {match.league.logo} {match.league.name}
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#fff'
                      }}>
                        {match.homeTeam.logo} {match.homeTeam.name} 
                        {match.score && (
                          <span style={{ color: '#fbbf24', margin: '0 8px' }}>
                            {match.score.home} - {match.score.away}
                          </span>
                        )}
                        {!match.score && <span style={{ color: '#6b7280', margin: '0 8px' }}>vs</span>}
                        {match.awayTeam.name} {match.awayTeam.logo}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#9ca3af',
                        marginTop: '4px'
                      }}>
                        {new Date(match.startTime).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  {/* Mercados de Apostas */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}>
                    {match.markets[0]?.options.map(option => (
                      <button
                        key={option.id}
                        style={{
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))',
                          border: '1px solid rgba(139, 92, 246, 0.4)',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          color: 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          minWidth: '80px',
                          textAlign: 'center'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(124, 58, 237, 0.4))'
                          e.currentTarget.style.transform = 'scale(1.05)'
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        <div style={{ fontSize: '12px', color: '#c4b5fd', marginBottom: '2px' }}>
                          {option.name}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fbbf24' }}>
                          {option.odd.toFixed(2)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'CASSINO' && (
          <div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '900',
              marginBottom: '24px',
              textAlign: 'center',
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🎰 CASSINO PREMIUM
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {casinoGames.map(game => (
                <div
                  key={game.id}
                  style={{
                    background: 'linear-gradient(135deg, rgba(26, 26, 27, 0.8), rgba(0, 0, 0, 0.4))',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)'
                    e.currentTarget.style.border = '1px solid rgba(245, 158, 11, 0.5)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.border = '1px solid rgba(139, 92, 246, 0.2)'
                  }}
                >
                  {/* Badges */}
                  {(game.hot || game.new) && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: game.hot ? '#ef4444' : '#10b981',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      {game.hot ? '🔥 HOT' : '✨ NEW'}
                    </div>
                  )}

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                      {game.emoji}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                      {game.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#10b981', marginBottom: '16px' }}>
                      👥 {game.players.toLocaleString()} jogando
                    </div>
                    <button style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                      color: '#000',
                      padding: '10px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}>
                      🎮 JOGAR
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'AO_VIVO' && (
          <div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '900',
              marginBottom: '24px',
              textAlign: 'center',
              color: '#ef4444'
            }}>
              🔴 JOGOS AO VIVO
            </h2>

            {liveMatches.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚽</div>
                <p>Nenhum jogo ao vivo no momento</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {liveMatches.map(match => (
                  <div
                    key={match.id}
                    style={{
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(0, 0, 0, 0.8))',
                      borderRadius: '16px',
                      padding: '20px',
                      border: '2px solid rgba(239, 68, 68, 0.5)'
                    }}
                  >
                    {/* Conteúdo similar ao tab de esportes, mas apenas jogos ao vivo */}
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#fff',
                      marginBottom: '12px'
                    }}>
                      🔴 {match.liveTime} - {match.homeTeam.name} {match.score?.home} - {match.score?.away} {match.awayTeam.name}
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {match.markets[0]?.options.map(option => (
                        <button
                          key={option.id}
                          style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            color: 'white',
                            cursor: 'pointer'
                          }}
                        >
                          {option.name}: {option.odd.toFixed(2)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
