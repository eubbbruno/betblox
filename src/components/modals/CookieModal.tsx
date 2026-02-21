'use client'

import { useState, useEffect } from 'react'

export default function CookieModal() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasAccepted = localStorage.getItem('betblox-cookies-accepted')
    const hasVerifiedAge = localStorage.getItem('betblox-age-verified')
    
    // Só mostra cookies depois da verificação de idade
    if (!hasAccepted && hasVerifiedAge) {
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('betblox-cookies-accepted', 'true')
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('betblox-cookies-accepted', 'false')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(26, 26, 27, 0.95))',
      borderRadius: '16px',
      padding: '24px',
      border: '2px solid rgba(139, 92, 246, 0.3)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
      zIndex: 9998,
      backdropFilter: 'blur(20px)',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px'
      }}>
        {/* Ícone */}
        <div style={{
          fontSize: '32px',
          flexShrink: 0
        }}>
          🍪
        </div>

        {/* Conteúdo */}
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '900',
            color: '#fbbf24',
            marginBottom: '12px',
            margin: 0
          }}>
            Política de Cookies
          </h3>

          <p style={{
            fontSize: '14px',
            color: '#e5e7eb',
            marginBottom: '20px',
            lineHeight: 1.5,
            margin: '12px 0 20px 0'
          }}>
            Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. 
            Ao continuar navegando, você concorda com nossa{' '}
            <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>
              Política de Privacidade
            </span> e uso de cookies.
          </p>

          {/* Botões */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleAccept}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              ✅ Aceitar Todos
            </button>

            <button
              onClick={handleReject}
              style={{
                background: 'transparent',
                color: '#9ca3af',
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid rgba(156, 163, 175, 0.3)',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(156, 163, 175, 0.1)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#9ca3af'
              }}
            >
              Rejeitar
            </button>

            <button
              style={{
                background: 'transparent',
                color: '#8b5cf6',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Configurar
            </button>
          </div>
        </div>

        {/* Botão Fechar */}
        <button
          onClick={handleReject}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#6b7280',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            flexShrink: 0
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
    </div>
  )
}
