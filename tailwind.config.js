/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fffbf0',
          100: '#fef3d6',
          200: '#fde4ab',
          300: '#fccf77',
          400: '#f9b243',
          500: '#f59218',
          600: '#e1710d',
          700: '#bb510e',
          800: '#953f13',
          900: '#793513',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#262626',
          900: '#171717',
          950: '#0d0d0d',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdfbf7',
          200: '#f9f5ec',
          300: '#f4ede0',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
