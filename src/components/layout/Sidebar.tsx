'use client'

import { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeSection, setActiveSection] = useState('ESPORTES')

  const menuItems = [
    {
      section: 'APOSTAS',
      items: [
        { name: 'ESPORTES', icon: '⚽', href: '/plataforma', badge: 'HOT' },
        { name: 'AO VIVO', icon: '🔴', href: '/ao-vivo', badge: '12' },
        { name: 'FUTEBOL', icon: '🏆', href: '/futebol' },
        { name: 'BASQUETE', icon: '🏀', href: '/basquete' },
        { name: 'TÊNIS', icon: '🎾', href: '/tenis' },
        { name: 'E-SPORTS', icon: '🎮', href: '/esports', badge: 'NEW' }
      ]
    },
    {
      section: 'CASSINO',
      items: [
        { name: 'TODOS JOGOS', icon: '🎰', href: '/cassino', badge: '500+' },
        { name: 'SLOTS', icon: '🎯', href: '/slots', badge: 'HOT' },
        { name: 'CRASH GAMES', icon: '✈️', href: '/crash' },
        { name: 'LIVE CASINO', icon: '🎪', href: '/live' },
        { name: 'BLACKJACK', icon: '🃏', href: '/blackjack' },
        { name: 'ROLETA', icon: '🎡', href: '/roleta' }
      ]
    },
    {
      section: 'CONTA',
      items: [
        { name: 'MEU PERFIL', icon: '👤', href: '/perfil' },
        { name: 'DEPOSITAR', icon: '💳', href: '/deposito', badge: 'PIX' },
        { name: 'SACAR', icon: '💰', href: '/saque' },
        { name: 'HISTÓRICO', icon: '📊', href: '/historico' },
        { name: 'BÔNUS', icon: '🎁', href: '/bonus', badge: '5' }
      ]
    },
    {
      section: 'SUPORTE',
      items: [
        { name: 'CHAT AO VIVO', icon: '💬', href: '/chat', badge: 'ONLINE' },
        { name: 'FAQ', icon: '❓', href: '/faq' },
        { name: 'TERMOS', icon: '📋', href: '/termos' },
        { name: 'RESPONSÁVEL', icon: '⚠️', href: '/responsavel' }
      ]
    }
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: 199,
            backdropFilter: 'blur(5px)'
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: isOpen ? '0' : '-320px',
        width: '320px',
        height: '100vh',
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.98), rgba(26, 26, 27, 0.98))',
        backdropFilter: 'blur(20px)',
        borderRight: '3px solid transparent',
        borderImage: 'linear-gradient(180deg, #fbbf24, #8b5cf6, #ef4444) 1',
        zIndex: 200,
        transition: 'left 0.3s ease',
        overflowY: 'auto',
        boxShadow: '10px 0 30px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header da Sidebar */}
        <div style={{
          padding: '20px',
          borderBottom: '2px solid rgba(139, 92, 246, 0.2)',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(0, 0, 0, 0.3))'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '900',
                color: '#000'
              }}>
                B
              </div>
              <div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '900',
                  color: '#fbbf24'
                }}>
                  BETBLOX
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6b7280',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.background = 'rgba(107, 114, 128, 0.2)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#6b7280'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              ✕
            </button>
          </div>

          {/* Status do Usuário */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: '#6ee7b7', marginBottom: '4px' }}>
              💰 SALDO DISPONÍVEL
            </div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#10b981' }}>
              R$ 50.000,00
            </div>
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav style={{ padding: '20px 0' }}>
          {menuItems.map((section, sectionIndex) => (
            <div key={section.section} style={{ marginBottom: '24px' }}>
              {/* Título da Seção */}
              <div style={{
                padding: '0 20px 12px 20px',
                fontSize: '12px',
                fontWeight: '900',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: '1px solid rgba(107, 114, 128, 0.2)',
                marginBottom: '12px'
              }}>
                {section.section}
              </div>

              {/* Items da Seção */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {section.items.map((item, itemIndex) => (
                  <a
                    key={item.name}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 20px',
                      color: '#e5e7eb',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      borderLeft: '4px solid transparent'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.1))'
                      e.currentTarget.style.borderLeft = '4px solid #8b5cf6'
                      e.currentTarget.style.color = '#fff'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderLeft = '4px solid transparent'
                      e.currentTarget.style.color = '#e5e7eb'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <span style={{ fontSize: '18px' }}>{item.icon}</span>
                      <span>{item.name}</span>
                    </div>

                    {/* Badge */}
                    {item.badge && (
                      <div style={{
                        background: item.badge === 'HOT' 
                          ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                          : item.badge === 'NEW'
                          ? 'linear-gradient(135deg, #10b981, #059669)'
                          : item.badge === 'ONLINE'
                          ? 'linear-gradient(135deg, #10b981, #059669)'
                          : item.badge === 'PIX'
                          ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                          : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        color: item.badge === 'PIX' ? '#000' : 'white',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '10px',
                        fontWeight: '900'
                      }}>
                        {item.badge}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer da Sidebar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(0, 0, 0, 0.8))',
          borderTop: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          {/* Botão de Emergência */}
          <button style={{
            width: '100%',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            padding: '12px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '12px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)'
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(239, 68, 68, 0.4)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            🆘 JOGO RESPONSÁVEL
          </button>

          {/* Versão */}
          <div style={{
            textAlign: 'center',
            fontSize: '10px',
            color: '#6b7280'
          }}>
            BetBlox v2.0 Premium
          </div>
        </div>
      </aside>
    </>
  )
}
