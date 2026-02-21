/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cores premium do cassino
        'black-premium': '#0A0A0B',
        'dark-surface': '#131316',
        'dark-border': '#1C1C21',
        'purple-neon': '#8B5CF6',
        'purple-glow': '#A78BFA',
        'purple-dark': '#6D28D9',
        'green-money': '#10B981',
        'green-neon': '#34D399',
        'gold-premium': '#F59E0B',
        'gold-shine': '#FCD34D',
        'red-loss': '#EF4444',
        'blue-info': '#3B82F6',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'money-rain': 'money-rain 4s linear infinite',
        'coin-flip': 'coin-flip 3s linear infinite',
        'glow-text': 'glow-text 2s ease-in-out infinite',
        'slide-ticker': 'slide-ticker 20s linear infinite',
        'float-up': 'float-up 2s ease-out forwards',
      },
      keyframes: {
        'neon-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px #8B5CF6',
            borderColor: '#8B5CF6'
          },
          '50%': { 
            boxShadow: '0 0 40px #8B5CF6, 0 0 60px #A78BFA',
            borderColor: '#A78BFA'
          }
        },
        'money-rain': {
          '0%': { 
            transform: 'translateY(-100vh) rotate(0deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(100vh) rotate(360deg)',
            opacity: '0'
          }
        },
        'coin-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' }
        },
        'glow-text': {
          '0%, 100%': { 
            textShadow: '0 0 20px #F59E0B'
          },
          '50%': { 
            textShadow: '0 0 40px #F59E0B, 0 0 60px #FCD34D'
          }
        },
        'slide-ticker': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'float-up': {
          '0%': {
            transform: 'translateY(0px)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(-100px)',
            opacity: '0'
          }
        }
      },
      backdropBlur: {
        '3xl': '64px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
