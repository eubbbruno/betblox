'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Aviso Superior */}
      <div style={{
        background: 'linear-gradient(90deg, #ef4444, #dc2626, #ef4444)',
        color: 'white',
        padding: '8px 0',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        animation: 'slide-ticker 20s linear infinite'
      }}>
        🚨 ATENÇÃO: Jogue com responsabilidade • +18 anos • Pode causar dependência • 
        🎉 BÔNUS DE BOAS-VINDAS: 100% até R$ 1.000 + 50 GIROS GRÁTIS • 
        💰 SAQUE VIA PIX EM 5 MINUTOS • 
        🔥 MAIS DE 50.000 JOGADORES ONLINE AGORA!
      </div>

      {/* Header Principal */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(26, 26, 27, 0.95))',
        backdropFilter: 'blur(20px)',
        borderBottom: '3px solid transparent',
        borderImage: 'linear-gradient(90deg, #fbbf24, #f59e0b, #8b5cf6, #7c3aed) 1',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo + Menu Mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Menu Hamburger (Mobile) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                color: '#fbbf24',
                fontSize: '24px',
                cursor: 'pointer',
                '@media (max-width: 768px)': {
                  display: 'block'
                }
              }}
            >
              ☰
            </button>

            {/* Logo */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: '900',
                color: '#000',
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
              }}>
                B
              </div>
              <div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '900',
                  background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1
                }}>
                  BETBLOX
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#10b981',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Casa de Apostas Premium
                </div>
              </div>
            </div>
          </div>

          {/* Navegação Central */}
          <nav style={{
            display: 'flex',
            gap: '8px',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '16px',
            padding: '8px',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}>
            {[
              { name: 'ESPORTES', icon: '⚽', href: '/plataforma' },
              { name: 'CASSINO', icon: '🎰', href: '/cassino' },
              { name: 'AO VIVO', icon: '🔴', href: '/ao-vivo' },
              { name: 'PROMOÇÕES', icon: '🎁', href: '/promocoes' }
            ].map(item => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: '#a78bfa',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#a78bfa'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                {item.name}
              </a>
            ))}
          </nav>

          {/* Área Direita - Saldo + Botões */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* Saldo */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '16px',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.3))'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))'
              e.currentTarget.style.transform = 'scale(1)'
            }}
            >
              <span style={{ fontSize: '20px' }}>💰</span>
              <div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#6ee7b7',
                  fontWeight: 'bold'
                }}>
                  SALDO
                </div>
                <div style={{ 
                  fontSize: '16px', 
                  color: '#10b981',
                  fontWeight: '900'
                }}>
                  R$ 50.000,00
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              {/* Botão Entrar */}
              <button style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))',
                border: '2px solid rgba(139, 92, 246, 0.4)',
                borderRadius: '12px',
                padding: '12px 20px',
                color: '#c4b5fd',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(124, 58, 237, 0.4))'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))'
                e.currentTarget.style.color = '#c4b5fd'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >
                🔑 ENTRAR
              </button>

              {/* Botão Registrar */}
              <button style={{
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                color: '#000',
                fontWeight: '900',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(251, 191, 36, 0.5)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(251, 191, 36, 0.3)'
              }}
              >
                🚀 REGISTRAR
              </button>
            </div>

            {/* Botão Perfil/Avatar */}
            <button style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              border: '2px solid rgba(139, 92, 246, 0.4)',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.5)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              👤
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '120px',
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '20px',
          zIndex: 99,
          borderBottom: '2px solid rgba(139, 92, 246, 0.3)'
        }}>
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {[
              { name: 'ESPORTES', icon: '⚽', href: '/plataforma' },
              { name: 'CASSINO', icon: '🎰', href: '/cassino' },
              { name: 'AO VIVO', icon: '🔴', href: '/ao-vivo' },
              { name: 'PROMOÇÕES', icon: '🎁', href: '/promocoes' }
            ].map(item => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: '1px solid rgba(139, 92, 246, 0.2)'
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
