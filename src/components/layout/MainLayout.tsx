'use client'

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0b 0%, #1a1a1b 100%)',
      color: 'white',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      {/* Header */}
      <Header />

      {/* Botão de Menu Flutuante */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        style={{
          position: 'fixed',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          border: 'none',
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 50,
          transition: 'all 0.3s ease',
          boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.6)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.4)'
        }}
      >
        ☰
      </button>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Conteúdo Principal */}
      <main style={{
        paddingTop: '20px',
        minHeight: 'calc(100vh - 120px)'
      }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(26, 26, 27, 0.95))',
        borderTop: '2px solid rgba(139, 92, 246, 0.3)',
        padding: '40px 0',
        marginTop: '60px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Coluna 1 - Sobre */}
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '900',
                color: '#fbbf24',
                marginBottom: '16px'
              }}>
                BETBLOX
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#9ca3af',
                lineHeight: 1.6,
                marginBottom: '16px'
              }}>
                A casa de apostas premium do Brasil. Apostas esportivas e cassino online com as melhores odds e pagamento via PIX em 5 minutos.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['📱', '💬', '📧', '🐦'].map((icon, index) => (
                  <div
                    key={index}
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(124, 58, 237, 0.4))'
                      e.currentTarget.style.transform = 'scale(1.1)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna 2 - Esportes */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '16px'
              }}>
                APOSTAS ESPORTIVAS
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {['Futebol', 'Basquete', 'Tênis', 'E-Sports', 'Vôlei'].map(sport => (
                  <a
                    key={sport}
                    href="#"
                    style={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#8b5cf6'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#9ca3af'
                    }}
                  >
                    {sport}
                  </a>
                ))}
              </div>
            </div>

            {/* Coluna 3 - Cassino */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '16px'
              }}>
                CASSINO
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {['Slots', 'Live Casino', 'Crash Games', 'Blackjack', 'Roleta'].map(game => (
                  <a
                    key={game}
                    href="#"
                    style={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#fbbf24'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#9ca3af'
                    }}
                  >
                    {game}
                  </a>
                ))}
              </div>
            </div>

            {/* Coluna 4 - Suporte */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '16px'
              }}>
                SUPORTE 24/7
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: '#10b981',
                  fontWeight: 'bold'
                }}>
                  💬 Chat ao Vivo - ONLINE
                </div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                  📧 suporte@betblox.com
                </div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                  📱 WhatsApp: (11) 9999-9999
                </div>
              </div>
            </div>
          </div>

          {/* Linha de Separação */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
            marginBottom: '24px'
          }} />

          {/* Bottom Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6b7280'
            }}>
              © 2024 BetBlox. Todos os direitos reservados. | Licença Curaçao #8048/JAZ
            </div>

            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}>
              <div style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '10px',
                color: '#fca5a5',
                fontWeight: 'bold'
              }}>
                +18
              </div>
              <div style={{
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '10px',
                color: '#6ee7b7',
                fontWeight: 'bold'
              }}>
                JOGUE RESPONSÁVEL
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
