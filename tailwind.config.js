/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
      },
      colors: {
        brand: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fde8d4',
          400: '#fb923c',
          500: '#e67e22',
          600: '#ea580c',
          700: '#c2410c',
        },
        surface: {
          DEFAULT: '#fefcf9',
          muted:   '#f8f5f0',
          border:  '#e8e2d9',
          hover:   '#f0ebe4',
        },
      },
      keyframes: {
        noteIn: {
          '0%':   { opacity: 0, transform: 'translateY(8px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        slideUp: {
          '0%':   { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        toastIn: {
          '0%':   { opacity: 0, transform: 'translateX(-50%) translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateX(-50%) translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        noteIn:  'noteIn 0.2s ease',
        slideUp: 'slideUp 0.2s ease',
        toastIn: 'toastIn 0.2s ease',
        fadeIn:  'fadeIn 0.15s ease',
      },
    },
  },
  plugins: [],
};
