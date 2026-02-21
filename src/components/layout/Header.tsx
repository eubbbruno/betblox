'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Aviso Superior */}
      <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white py-2 text-center text-sm font-bold animate-[slide-ticker_20s_linear_infinite]">
        🚨 ATENÇÃO: Jogue com responsabilidade • +18 anos • Pode causar dependência • 
        🎉 BÔNUS DE BOAS-VINDAS: 100% até R$ 1.000 + 50 GIROS GRÁTIS • 
        💰 SAQUE VIA PIX EM 5 MINUTOS • 
        🔥 MAIS DE 50.000 JOGADORES ONLINE AGORA!
      </div>

      {/* Header Principal */}
      <header className="bg-gradient-to-br from-black/95 to-zinc-900/95 backdrop-blur-xl border-b-[3px] border-gradient sticky top-0 z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.5)]" style={{ borderImage: 'linear-gradient(90deg, #fbbf24, #f59e0b, #8b5cf6, #7c3aed) 1' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo + Menu Mobile */}
          <div className="flex items-center gap-4">
            {/* Menu Hamburger (Mobile) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hidden md:hidden max-md:block bg-transparent border-none text-amber-400 text-2xl cursor-pointer"
            >
              ☰
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center text-2xl font-black text-black shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                B
              </div>
              <div>
                <div className="text-[28px] font-black bg-gradient-to-br from-amber-400 to-amber-500 bg-clip-text text-transparent leading-none">
                  BETBLOX
                </div>
                <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                  Casa de Apostas Premium
                </div>
              </div>
            </div>
          </div>

          {/* Navegação Central */}
          <nav className="hidden md:flex gap-2 bg-purple-500/10 rounded-2xl p-2 border border-purple-500/20">
            {[
              { name: 'ESPORTES', icon: '⚽', href: '/plataforma' },
              { name: 'CASSINO', icon: '🎰', href: '/cassino' },
              { name: 'AO VIVO', icon: '🔴', href: '/ao-vivo' },
              { name: 'PROMOÇÕES', icon: '🎁', href: '/promocoes' }
            ].map(item => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-transparent text-purple-300 no-underline text-sm font-bold transition-all duration-300 cursor-pointer hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-purple-600/20 hover:text-white hover:-translate-y-0.5"
              >
                <span className="text-base">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </nav>

          {/* Área Direita - Saldo + Botões */}
          <div className="flex items-center gap-4">
            {/* Saldo */}
            <div className="hidden md:flex bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-2 border-emerald-500/40 rounded-2xl px-5 py-3 items-center gap-2 cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-emerald-500/30 hover:to-emerald-600/30 hover:scale-105">
              <span className="text-xl">💰</span>
              <div>
                <div className="text-xs text-emerald-300 font-bold">
                  SALDO
                </div>
                <div className="text-base text-emerald-500 font-black">
                  R$ 50.000,00
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="hidden md:flex gap-3">
              {/* Botão Entrar */}
              <button className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-2 border-purple-500/40 rounded-xl px-5 py-3 text-purple-300 font-bold text-sm cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-500/40 hover:to-purple-600/40 hover:text-white hover:-translate-y-0.5">
                🔑 ENTRAR
              </button>

              {/* Botão Registrar */}
              <button className="bg-gradient-to-br from-amber-400 to-amber-500 border-none rounded-xl px-6 py-3 text-black font-black text-sm cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_10px_30px_rgba(251,191,36,0.5)]">
                🚀 REGISTRAR
              </button>
            </div>

            {/* Botão Perfil/Avatar */}
            <button className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 border-2 border-purple-500/40 text-white text-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              👤
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile Overlay */}
      {isMenuOpen && (
        <div className="fixed top-[120px] left-0 right-0 bg-black/95 backdrop-blur-xl p-5 z-[99] border-b-2 border-purple-500/30">
          <nav className="flex flex-col gap-4">
            {[
              { name: 'ESPORTES', icon: '⚽', href: '/plataforma' },
              { name: 'CASSINO', icon: '🎰', href: '/cassino' },
              { name: 'AO VIVO', icon: '🔴', href: '/ao-vivo' },
              { name: 'PROMOÇÕES', icon: '🎁', href: '/promocoes' }
            ].map(item => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-5 py-4 rounded-xl bg-purple-500/10 text-white no-underline text-base font-bold border border-purple-500/20"
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
