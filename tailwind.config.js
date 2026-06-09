/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        // Soft pastel / premium colors for Pokemon Types
        type: {
          grass: '#4ade80',
          fire: '#f87171',
          water: '#60a5fa',
          bug: '#a3e635',
          normal: '#d1d5db',
          poison: '#c084fc',
          electric: '#facc15',
          ground: '#eab308',
          fairy: '#f472b6',
          fighting: '#fb923c',
          psychic: '#fb7185',
          rock: '#b45309',
          ghost: '#a78bfa',
          ice: '#7dd3fc',
          dragon: '#818cf8',
          dark: '#3f3f46',
          steel: '#94a3b8',
          flying: '#c7d2fe',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
