'use client'

import AgeVerificationModal from '@/components/modals/AgeVerificationModal'
import CookieModal from '@/components/modals/CookieModal'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0b 0%, #581c87 25%, #1e3a8a 50%, #312e81 75%, #0a0a0b 100%)',
      color: 'white',
      fontFamily: 'Inter, Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efeito de Partículas de Fundo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
        `,
        animation: 'pulse 4s ease-in-out infinite',
        pointerEvents: 'none'
      }}></div>

      {/* Header Premium Ultra */}
      <header style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid rgba(139, 92, 246, 0.3)',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 10px 30px rgba(139, 92, 246, 0.2)'
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
            <h1 style={{
              fontSize: '36px',
              fontWeight: '900',
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(245, 158, 11, 0.5)',
              letterSpacing: '2px'
            }}>
              BETBLOX
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(16, 185, 129, 0.2)',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#10b981',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
              <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '14px' }}>
                18.547 online
              </span>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(16, 185, 129, 0.3))',
            padding: '16px 24px',
            borderRadius: '16px',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '900',
              color: '#fbbf24',
              textShadow: '0 0 20px rgba(245, 158, 11, 0.8)',
              animation: 'glow 2s ease-in-out infinite alternate'
            }}>
              💰 R$ 1.247.892
            </div>
            <div style={{
              fontSize: '12px',
              color: '#a78bfa',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              MEGA JACKPOT ACUMULADO
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Ultra Épica */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ marginBottom: '60px' }}>
          {/* Título Principal Épico */}
          <h2 style={{
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: '900',
            marginBottom: '32px',
            lineHeight: 1.1,
            textShadow: '0 0 50px rgba(245, 158, 11, 0.8)'
          }}>
            <div style={{
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'glow 3s ease-in-out infinite alternate',
              marginBottom: '16px'
            }}>
              O CASSINO QUE
            </div>
            <div style={{
              background: 'linear-gradient(45deg, #8b5cf6, #7c3aed, #6d28d9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'glow 3s ease-in-out infinite alternate-reverse'
            }}>
              PAGA DE VERDADE
            </div>
            <div style={{
              fontSize: '80px',
              marginLeft: '20px',
              display: 'inline-block',
              animation: 'bounce 2s infinite'
            }}>
              💰
            </div>
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: '28px',
            color: '#e5e7eb',
            marginBottom: '40px',
            maxWidth: '800px',
            margin: '0 auto 40px auto',
            lineHeight: 1.4
          }}>
            Saque via <span style={{
              color: '#10b981',
              fontWeight: '900',
              textShadow: '0 0 20px rgba(16, 185, 129, 0.8)'
            }}>PIX em até 5 minutos</span>. 
            Jogue agora e receba na hora!
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
            marginBottom: '60px'
          }}>
            <a 
              href="/plataforma"
              style={{
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                color: '#000',
                padding: '20px 60px',
                borderRadius: '20px',
                fontSize: '24px',
                fontWeight: '900',
                textDecoration: 'none',
                boxShadow: '0 20px 50px rgba(245, 158, 11, 0.4)',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(245, 158, 11, 0.6)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)'
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(245, 158, 11, 0.4)'
              }}
            >
              🎁 GANHE R$ 50 GRÁTIS →
            </a>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(20px)',
              padding: '20px 40px',
              borderRadius: '16px',
              border: '2px solid #ef4444',
              boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
            }}>
              <div style={{
                color: '#ef4444',
                fontWeight: '900',
                fontSize: '16px',
                marginBottom: '8px',
                letterSpacing: '1px'
              }}>
                ⏰ OFERTA EXPIRA EM:
              </div>
              <div style={{
                fontSize: '36px',
                fontWeight: '900',
                color: '#ef4444',
                textShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
                animation: 'pulse 2s infinite'
              }}>
                4:59
              </div>
            </div>
          </div>
        </div>

        {/* Jogos Populares */}
        <div className="mb-16">
          <h3 className="text-4xl font-black mb-8">
            🔥 <span className="text-yellow-400">JOGOS MAIS QUENTES</span> DO MOMENTO
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 1, nome: "Fortune Tiger", emoji: "🐅", multiplicador: "1000x", popular: true, quente: true },
              { id: 2, nome: "Sweet Bonanza", emoji: "🍭", multiplicador: "500x", popular: true, quente: false },
              { id: 3, nome: "Aviator", emoji: "✈️", multiplicador: "∞", popular: true, quente: true },
              { id: 4, nome: "Gates of Olympus", emoji: "⚡", multiplicador: "5000x", popular: false, quente: true }
            ].map((jogo) => (
              <div
                key={jogo.id}
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 cursor-pointer relative group border border-purple-500/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-1">
                  {jogo.quente && (
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                      🔥 QUENTE
                    </div>
                  )}
                  {jogo.popular && (
                    <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                      👑 POPULAR
                    </div>
                  )}
                </div>

                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">{jogo.emoji}</div>
                <h4 className="text-xl font-black text-white mb-2">{jogo.nome}</h4>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-purple-300">Multiplicador:</span>
                    <span className="text-yellow-400 font-bold">{jogo.multiplicador}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Jogando agora:</span>
                    <span className="text-green-400 font-bold">1.2k</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white py-3 rounded-lg font-bold text-sm transition-all hover:shadow-lg">
                  🎮 JOGAR AGORA
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: "✅", title: "Licença Internacional", desc: "Regulamentado e Seguro" },
            { icon: "👥", title: "+50.000 Jogadores", desc: "Comunidade Ativa" },
            { icon: "⚡", title: "Saque Imediato", desc: "PIX em 5 minutos" },
            { icon: "📱", title: "Suporte 24/7", desc: "WhatsApp disponível" }
          ].map((item, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-sm p-6 rounded-lg text-center border border-purple-500/20 hover:border-purple-400/50 transition-all">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-bold text-white mb-1">{item.title}</div>
              <div className="text-purple-300 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-purple-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
          <h3 className="text-3xl font-black text-yellow-400 mb-4">
            🎉 COMECE A GANHAR AGORA!
          </h3>
          <p className="text-purple-300 mb-6">
            Mais de 15 jogos premium dos melhores provedores do mundo
          </p>
          <a 
            href="/plataforma"
            className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl text-xl font-black hover:scale-105 transition-transform"
          >
            🚀 ENTRAR NA PLATAFORMA
          </a>
        </div>
      </main>

      {/* Ticker de Vitórias */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 border-t border-green-500/30 py-3 z-40">
        <div className="text-center">
          <span className="text-green-400 font-bold animate-pulse">
            🎉 João P. ganhou R$ 1.847 no Fortune Tiger • 💰 Maria S. sacou R$ 3.200 via PIX • 🔥 Carlos ganhou 500x no Aviator!
          </span>
        </div>
      </div>

      {/* Modais */}
      <AgeVerificationModal />
      <CookieModal />
    </div>
  )
}
