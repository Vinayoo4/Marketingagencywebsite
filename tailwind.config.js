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
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'gradient': 'gradient 4s ease infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'border-flow': 'borderFlow 3s linear infinite',
        'kenny-burns': 'kennyBurns 20s ease-in-out infinite',
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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -10px) rotate(2deg)' },
          '75%': { transform: 'translate(-10px, 10px) rotate(-2deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(34, 211, 238, 0.3), 0 0 16px rgba(34, 211, 238, 0.1)' },
          '50%': { boxShadow: '0 0 16px rgba(34, 211, 238, 0.5), 0 0 32px rgba(34, 211, 238, 0.2), 0 0 48px rgba(34, 211, 238, 0.1)' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        kennyBurns: {
          '0%': { transform: 'scale(1.1) translate(0, 0)' },
          '50%': { transform: 'scale(1.15) translate(-5px, -3px)' },
          '100%': { transform: 'scale(1.1) translate(0, 0)' },
        },
      },
      backgroundImage: {
        'shiva-gradient': 'linear-gradient(135deg, #1e1b4b 0%, #0a0a14 50%, #1e1b4b 100%)',
        'cyan-glow': 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
        'violet-glow': 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 60%)',
        'grid-pattern': 'linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '60px 60px',
        '300%': '300%',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};
