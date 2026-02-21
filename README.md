# 🎰 BetBlox - Plataforma de Cassino Premium

**O cassino online mais confiável do Brasil com saque via PIX em 5 minutos!**

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15.5.2** - Framework React com App Router
- **React 18.3.1** - Biblioteca JavaScript para UI
- **TypeScript 5.6.3** - Tipagem estática
- **Tailwind CSS 3.4.17** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis e customizáveis

### Backend & Database
- **Prisma 6.1.0** - ORM moderno para banco de dados
- **SQLite** - Banco de dados local (desenvolvimento)
- **PostgreSQL** - Banco de dados (produção)

### Utilitários
- **React Query 5.62.3** - Gerenciamento de estado servidor
- **Clsx** - Utilitário para classes condicionais
- **Lucide React** - Ícones SVG

## 🎮 Funcionalidades

### 🏠 Landing Page
- Hero section com animações premium
- Contador de jackpot em tempo real
- CTAs de conversão otimizados
- Ticker de vitórias ao vivo
- Design responsivo mobile-first

### 🎰 Cassino
- **10+ jogos** de diferentes categorias:
  - 🎰 **Slots:** Fortune Tiger, Sweet Bonanza, Gates of Olympus
  - 🎲 **Live Casino:** Crazy Time, Lightning Roulette
  - 🚀 **Crash Games:** Aviator
  - 🃏 **Mesa:** Blackjack Classic
  - ⚡ **Instantâneo:** Mines

### 🎯 Filtros e Busca
- Filtros por categoria (Slots, Live, Crash, etc.)
- Sistema de busca por nome/provedor
- Badges dinâmicas (Popular, Quente, Novo)
- Ordenação por RTP, volatilidade

### 🎲 Slot Machine Funcional
- Rolos animados com CSS puro
- Sistema de apostas configurável
- Multiplicadores por símbolo
- Animações de vitória com moedas
- Estatísticas em tempo real
- Paytable interativa

## 🎨 Design Premium

### Paleta de Cores
- **Black Premium:** #0A0A0B
- **Purple Neon:** #8B5CF6
- **Gold Premium:** #F59E0B
- **Green Money:** #10B981
- **Red Loss:** #EF4444

### Efeitos Visuais
- Gradientes vibrantes
- Glassmorphism com backdrop-blur
- Animações CSS nativas
- Hover effects épicos
- Neon glow borders
- Particle animations

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Comandos de Instalação
```bash
# Clonar repositório
git clone https://github.com/seu-usuario/betblox.git
cd betblox

# Instalar dependências
npm install

# Configurar banco de dados
npx prisma generate
npx prisma db push

# Iniciar servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Servidor desenvolvimento (localhost:3000)
npm run build        # Build para produção
npm run start        # Servidor produção
npm run lint         # Verificar código
npm run db:push      # Aplicar schema no banco
npm run db:studio    # Interface visual do banco
npm run db:generate  # Gerar cliente Prisma
```

## 🌐 URLs da Aplicação

- **🏠 Home:** http://localhost:3000
- **🎰 Cassino:** http://localhost:3000/cassino
- **🎲 Slot Machine:** http://localhost:3000/jogo

## 📱 Páginas Implementadas

### `/` - Landing Page
- Hero section bombástico
- Jogos populares em destaque
- Trust badges profissionais
- CTA de bônus de boas-vindas
- Contador de usuários online

### `/cassino` - Página Principal
- Grid responsivo de jogos
- Filtros por categoria
- Sistema de busca
- Cards de jogos com hover effects
- Badges de popularidade

### `/jogo` - Slot Machine
- Jogo funcional completo
- Sistema de apostas
- Animações de vitória
- Estatísticas do jogador
- Controles de aposta

## 🔧 Configuração

### Variáveis de Ambiente (.env.local)
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-secret-aqui"
GAME_AGGREGATOR_URL="http://localhost:3000/api/mock/aggregator"
```

### Tailwind Config
- Cores personalizadas do tema
- Animações customizadas
- Breakpoints responsivos
- Utilitários especiais

## 🎯 Próximas Implementações

- [ ] Sistema de autenticação (NextAuth.js)
- [ ] API de integração com provedores
- [ ] Dashboard do usuário
- [ ] Sistema de transações
- [ ] Webhooks de jogos
- [ ] Modo demo
- [ ] Chat ao vivo
- [ ] Programa VIP

## 📊 Estrutura do Projeto

```
betblox/
├── src/
│   ├── app/                 # App Router (Next.js 13+)
│   │   ├── page.tsx         # Landing page
│   │   ├── cassino/         # Página do cassino
│   │   ├── jogo/            # Slot machine
│   │   ├── layout.tsx       # Layout principal
│   │   └── globals.css      # Estilos globais
│   ├── components/          # Componentes React
│   │   ├── ui/              # Componentes base (Button, Card)
│   │   └── games/           # Componentes de jogos
│   ├── lib/                 # Utilitários e configurações
│   │   ├── utils.ts         # Funções utilitárias
│   │   └── gameProviders/   # Mock de provedores
│   └── types/               # Definições TypeScript
├── prisma/                  # Schema e migrações
├── public/                  # Arquivos estáticos
└── docs/                    # Documentação
```

## 🏆 Características Premium

### Performance
- ⚡ Next.js 15 com App Router
- 🔄 React Query para cache inteligente
- 📱 Mobile-first responsive
- 🎯 Lazy loading de componentes

### UX/UI
- 🎨 Design Las Vegas premium
- ✨ Micro-interactions suaves
- 🎭 Animações CSS nativas
- 🌟 Feedback visual imediato

### Segurança
- 🔒 Validação de entrada
- 🛡️ CSRF protection
- 🔐 Environment variables
- 📋 TypeScript strict mode

## 📞 Suporte

Para dúvidas e suporte:
- 📧 Email: suporte@betblox.com
- 💬 WhatsApp: +55 11 99999-9999
- 🌐 Site: https://betblox.com

---

**🎰 BetBlox - O cassino que paga de verdade! 💰**

*Desenvolvido com ❤️ no Brasil*
