/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff6ec7',
          'pink-dark': '#d946ef',
          'pink-light': '#f9a8d4',
          teal: '#14b8a6',
          'teal-dark': '#0d9488',
          'teal-light': '#5eead4',
          purple: '#a855f7',
          'purple-dark': '#7c3aed',
          'purple-light': '#c084fc',
        },
        dream: {
          pink: '#ec4899',
          'pink-deep': '#be185d',
          teal: '#06b6d4',
          purple: '#9333ea',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dream': 'linear-gradient(135deg, #ec4899 0%, #9333ea 50%, #06b6d4 100%)',
      },
    },
  },
  plugins: [],
}

