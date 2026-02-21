# 🚀 SETUP COMPLETO - BetBlox

## 📋 COMANDOS DE INSTALAÇÃO COMPLETA

### 1️⃣ **INICIALIZAR PROJETO**
```bash
npm init -y
```

### 2️⃣ **INSTALAR NEXT.JS + REACT + TYPESCRIPT**
```bash
npm install next@latest react@latest react-dom@latest typescript @types/node @types/react @types/react-dom
```

### 3️⃣ **INSTALAR TAILWIND CSS**
```bash
npm install tailwindcss postcss autoprefixer @tailwindcss/postcss
npx tailwindcss init -p
```

### 4️⃣ **INSTALAR COMPONENTES UI**
```bash
npm install clsx class-variance-authority lucide-react
```

### 5️⃣ **INSTALAR RADIX UI**
```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-slot
```

### 6️⃣ **INSTALAR PRISMA ORM**
```bash
npm install prisma @prisma/client
npx prisma init
```

### 7️⃣ **INSTALAR REACT QUERY**
```bash
npm install @tanstack/react-query
```

### 8️⃣ **INSTALAR ESLINT (OPCIONAL)**
```bash
npm install eslint eslint-config-next
```

---

## 🔧 **COMANDO ÚNICO - INSTALAR TUDO**

```bash
npm install next@latest react@latest react-dom@latest typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer @tailwindcss/postcss clsx class-variance-authority lucide-react @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-slot prisma @prisma/client @tanstack/react-query eslint eslint-config-next
```

---

## 📁 **ESTRUTURA DE ARQUIVOS CRIADA**

```
betblox/
├── package.json              ✅ Configuração NPM
├── next.config.js            ✅ Configuração Next.js
├── tsconfig.json             ✅ Configuração TypeScript
├── tailwind.config.ts        ✅ Configuração Tailwind
├── postcss.config.js         ✅ Configuração PostCSS
├── .env.local                ✅ Variáveis ambiente
├── .gitignore                ✅ Arquivos ignorados
├── next-env.d.ts             ✅ Tipos Next.js
├── README.md                 ✅ Documentação
├── SETUP.md                  ✅ Guia de instalação
├── src/
│   ├── app/
│   │   ├── layout.tsx        ✅ Layout principal
│   │   ├── page.tsx          ✅ Landing page
│   │   ├── globals.css       ✅ Estilos globais
│   │   ├── cassino/
│   │   │   └── page.tsx      ✅ Página cassino
│   │   └── jogo/
│   │       └── page.tsx      ✅ Slot machine
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx    ✅ Componente Button
│   │   │   └── card.tsx      ✅ Componente Card
│   │   └── games/
│   │       └── GameCard.tsx  ✅ Card de jogos
│   ├── lib/
│   │   ├── utils.ts          ✅ Funções utilitárias
│   │   └── gameProviders/
│   │       └── mockData.ts   ✅ Dados de jogos
│   └── types/
│       └── game.ts           ✅ Tipos TypeScript
```

---

## 🎯 **COMANDOS PARA RODAR**

### **Desenvolvimento:**
```bash
npm run dev
```

### **Build Produção:**
```bash
npm run build
npm run start
```

### **Banco de Dados:**
```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

---

## 🌐 **URLS DISPONÍVEIS**

- **🏠 Home:** http://localhost:3000
- **🎰 Cassino:** http://localhost:3000/cassino
- **🎲 Slot:** http://localhost:3000/jogo

---

## ✅ **CHECKLIST DE VERIFICAÇÃO**

- [ ] Node.js 18+ instalado
- [ ] NPM funcionando
- [ ] Todas dependências instaladas
- [ ] Arquivos de configuração criados
- [ ] Estrutura de pastas completa
- [ ] Servidor Next.js rodando
- [ ] Tailwind CSS funcionando
- [ ] Componentes renderizando
- [ ] Páginas acessíveis

---

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **Erro: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Erro: Port already in use**
```bash
npx kill-port 3000
npm run dev
```

### **Erro: Tailwind não funciona**
```bash
npm run build
npm run dev
```

---

## 📞 **SUPORTE**

Se algo não funcionar:
1. Verifique se Node.js 18+ está instalado
2. Delete node_modules e reinstale
3. Verifique se todas as dependências estão no package.json
4. Execute npm run build antes de npm run dev

---

**🎰 SETUP COMPLETO - BETBLOX PRONTO PARA RODAR! 🚀**
