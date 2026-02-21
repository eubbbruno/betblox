'use client'

import { useState, useEffect } from 'react'

const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '🔔', '🍀']
const winMultipliers = {
  '🍒🍒🍒': 5,
  '🍋🍋🍋': 10,
  '🍊🍊🍊': 15,
  '🍇🍇🍇': 20,
  '⭐⭐⭐': 50,
  '💎💎💎': 100,
  '🔔🔔🔔': 250,
  '🍀🍀🍀': 500
}

export default function JogoPage() {
  const [reels, setReels] = useState(['🍒', '🍋', '🍊'])
  const [isSpinning, setIsSpinning] = useState(false)
  const [balance, setBalance] = useState(50000)
  const [bet, setBet] = useState(100)
  const [lastWin, setLastWin] = useState(0)
  const [totalWins, setTotalWins] = useState(0)
  const [winStreak, setWinStreak] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [spinsCount, setSpinsCount] = useState(0)

  const spin = () => {
    if (balance < bet || isSpinning) return

    setIsSpinning(true)
    setBalance(prev => prev - bet)
    setSpinsCount(prev => prev + 1)

    // Simular animação dos rolos
    const spinDuration = 2000 + Math.random() * 1000
    
    setTimeout(() => {
      const newReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]
      
      setReels(newReels)
      
      // Verificar vitória
      const combination = newReels.join('')
      const multiplier = winMultipliers[combination as keyof typeof winMultipliers] || 0
      const winAmount = bet * multiplier
      
      if (winAmount > 0) {
        setLastWin(winAmount)
        setBalance(prev => prev + winAmount)
        setTotalWins(prev => prev + winAmount)
        setWinStreak(prev => prev + 1)
      } else {
        setLastWin(0)
        setWinStreak(0)
      }
      
      setIsSpinning(false)
    }, spinDuration)
  }

  const maxBet = () => {
    setBet(Math.min(balance, 1000))
  }

  const changeBet = (amount: number) => {
    const newBet = Math.max(10, Math.min(balance, bet + amount))
    setBet(newBet)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (autoPlay && !isSpinning && balance >= bet) {
      interval = setTimeout(() => {
        spin()
      }, 3000)
    }
    return () => clearTimeout(interval)
  }, [autoPlay, isSpinning, balance, bet])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0b 0%, #581c87 25%, #1e3a8a 50%, #312e81 75%, #0a0a0b 100%)',
      color: 'white',
      fontFamily: 'Inter, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid rgba(139, 92, 246, 0.3)',
        padding: '16px 0'
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
              fontSize: '24px',
              fontWeight: '900',
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none'
            }}>
              BETBLOX
            </a>
            <span style={{ color: '#a78bfa', fontSize: '16px' }}>|</span>
            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
              🎰 Fortune Slots
            </span>
          </div>
          
          <a href="/cassino" style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            ← Voltar ao Cassino
          </a>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        {/* Painel Principal do Jogo */}
        <div style={{
          flex: 2,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(139, 92, 246, 0.1))',
          borderRadius: '20px',
          padding: '40px',
          margin: '20px',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Título do Jogo */}
          <h1 style={{
            fontSize: '36px',
            fontWeight: '900',
            marginBottom: '30px',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            🎰 FORTUNE SLOTS
          </h1>

          {/* Machine de Slots */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
            borderRadius: '20px',
            padding: '40px',
            border: '4px solid #fbbf24',
            boxShadow: '0 0 50px rgba(245, 158, 11, 0.3)',
            marginBottom: '30px'
          }}>
            {/* Display dos Rolos */}
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '30px'
            }}>
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  style={{
                    width: '120px',
                    height: '120px',
                    background: isSpinning 
                      ? 'linear-gradient(45deg, #8b5cf6, #7c3aed)' 
                      : 'linear-gradient(135deg, #fff, #f3f4f6)',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '60px',
                    border: '3px solid #fbbf24',
                    boxShadow: isSpinning 
                      ? '0 0 30px rgba(139, 92, 246, 0.8)' 
                      : '0 0 20px rgba(245, 158, 11, 0.5)',
                    animation: isSpinning ? 'spin 0.1s linear infinite' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSpinning ? '🌀' : symbol}
                </div>
              ))}
            </div>

            {/* Resultado da Última Jogada */}
            {lastWin > 0 && (
              <div style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '20px',
                animation: 'pulse 2s infinite'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>
                  🎉 VOCÊ GANHOU! 🎉
                </div>
                <div style={{ fontSize: '32px', fontWeight: '900', color: '#fbbf24' }}>
                  R$ {lastWin.toLocaleString()}
                </div>
              </div>
            )}

            {/* Botão de Spin */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={spin}
                disabled={isSpinning || balance < bet}
                style={{
                  width: '200px',
                  height: '80px',
                  background: isSpinning 
                    ? 'linear-gradient(135deg, #6b7280, #4b5563)' 
                    : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  color: isSpinning ? '#9ca3af' : '#000',
                  border: 'none',
                  borderRadius: '15px',
                  fontSize: '24px',
                  fontWeight: '900',
                  cursor: isSpinning ? 'not-allowed' : 'pointer',
                  boxShadow: '0 10px 30px rgba(245, 158, 11, 0.5)',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase'
                }}
                onMouseOver={(e) => {
                  if (!isSpinning && balance >= bet) {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {isSpinning ? '🌀 GIRANDO...' : '🎰 GIRAR'}
              </button>
            </div>
          </div>

          {/* Controles de Aposta */}
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(139, 92, 246, 0.2)',
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>APOSTA:</span>
              <button
                onClick={() => changeBet(-10)}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                -
              </button>
              <span style={{
                fontSize: '18px',
                fontWeight: '900',
                color: '#fbbf24',
                minWidth: '80px',
                textAlign: 'center'
              }}>
                R$ {bet}
              </span>
              <button
                onClick={() => changeBet(10)}
                style={{
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                +
              </button>
            </div>

            <button
              onClick={maxBet}
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              MAX BET
            </button>

            <button
              onClick={() => setAutoPlay(!autoPlay)}
              style={{
                background: autoPlay 
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                  : 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {autoPlay ? '⏸️ PARAR AUTO' : '▶️ AUTO PLAY'}
            </button>
          </div>
        </div>

        {/* Painel de Estatísticas */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          margin: '20px'
        }}>
          {/* Saldo */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.3))',
            borderRadius: '16px',
            padding: '24px',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '16px', color: '#10b981', marginBottom: '8px', fontWeight: 'bold' }}>
              💰 SEU SALDO
            </h3>
            <div style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#fff',
              textShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
            }}>
              R$ {balance.toLocaleString()}
            </div>
          </div>

          {/* Estatísticas */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))',
            borderRadius: '16px',
            padding: '24px',
            border: '2px solid rgba(139, 92, 246, 0.3)'
          }}>
            <h3 style={{ fontSize: '16px', color: '#8b5cf6', marginBottom: '16px', fontWeight: 'bold' }}>
              📊 ESTATÍSTICAS
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#a78bfa' }}>Total de Giros:</span>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>{spinsCount}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#a78bfa' }}>Total Ganho:</span>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>R$ {totalWins.toLocaleString()}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#a78bfa' }}>Sequência:</span>
                <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{winStreak}x</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#a78bfa' }}>Última Vitória:</span>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                  R$ {lastWin.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Tabela de Pagamentos */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.2))',
            borderRadius: '16px',
            padding: '24px',
            border: '2px solid rgba(245, 158, 11, 0.3)'
          }}>
            <h3 style={{ fontSize: '16px', color: '#fbbf24', marginBottom: '16px', fontWeight: 'bold' }}>
              💎 TABELA DE PAGAMENTOS
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              {Object.entries(winMultipliers).map(([combo, multiplier]) => (
                <div key={combo} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px' }}>{combo.replace(/(.)/g, '$1 ')}</span>
                  <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{multiplier}x</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}