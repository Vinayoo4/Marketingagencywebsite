/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a14',
        shiva: {
          indigo: '#312e81',
          'indigo-dark': '#1e1b4b',
          cyan: '#22d3ee',
          'cyan-dark': '#0891b2',
          silver: '#c0c0c0',
          gold: '#d4af37',
          saffron: '#ff6b00',
        },
        nandi: {
          blue: '#233CB5',
          gold: '#BF9113',
          orange: '#E26912',
          olive: '#909648',
          pink: '#F1ACC6',
        },
        accent: {
          DEFAULT: '#22d3ee',
          dark: '#0891b2',
        },
      },
      backgroundColor: {
        dark: '#0a0a14',
      },
      fontFamily: {
        divine: ['"Cinzel"', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px #22d3ee, 0 0 10px #22d3ee' },
          '50%': { boxShadow: '0 0 20px #22d3ee, 0 0 40px #22d3ee, 0 0 60px #22d3ee' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'shiva-gradient': 'linear-gradient(135deg, #1e1b4b 0%, #0a0a14 50%, #1e1b4b 100%)',
        'cyan-glow': 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};