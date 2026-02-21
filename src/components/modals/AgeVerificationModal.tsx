'use client'

import { useState, useEffect } from 'react'

export default function AgeVerificationModal() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasVerified = localStorage.getItem('betblox-age-verified')
    if (!hasVerified) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('betblox-age-verified', 'true')
    setIsVisible(false)
  }

  const handleReject = () => {
    window.location.href = 'https://www.google.com'
  }

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0a0a0b, #1a1a1b)',
        borderRadius: '24px',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        border: '2px solid #ef4444',
        boxShadow: '0 20px 60px rgba(239, 68, 68, 0.5)'
      }}>
        {/* Ícone de Aviso */}
        <div style={{
          fontSize: '80px',
          marginBottom: '24px',
          animation: 'pulse 2s infinite'
        }}>
          🔞
        </div>

        {/* Título */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: '900',
          color: '#ef4444',
          marginBottom: '16px',
          textShadow: '0 0 20px rgba(239, 68, 68, 0.8)'
        }}>
          VERIFICAÇÃO DE IDADE
        </h2>

        {/* Texto */}
        <p style={{
          fontSize: '18px',
          color: '#e5e7eb',
          marginBottom: '24px',
          lineHeight: 1.6
        }}>
          Este site contém conteúdo relacionado a jogos de azar e apostas.
          <br /><br />
          <strong style={{ color: '#fbbf24' }}>
            Você confirma que tem 18 anos ou mais?
          </strong>
        </p>

        {/* Aviso Legal */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#fca5a5',
            margin: 0,
            lineHeight: 1.4
          }}>
            ⚠️ <strong>JOGUE COM RESPONSABILIDADE</strong><br />
            Jogos podem causar dependência. Procure ajuda se necessário.
          </p>
        </div>

        {/* Botões */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleReject}
            style={{
              background: 'linear-gradient(135deg, #6b7280, #4b5563)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
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
            ❌ TENHO MENOS DE 18
          </button>

          <button
            onClick={handleAccept}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.5)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            ✅ SOU MAIOR DE 18
          </button>
        </div>

        {/* Rodapé */}
        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          marginTop: '24px',
          margin: 0
        }}>
          Ao continuar, você concorda com nossos Termos de Uso
        </p>
      </div>
    </div>
  )
}
