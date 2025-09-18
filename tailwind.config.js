/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          500: '#ff7800',
          600: '#ff7800',
          700: '#e56900',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff7800',
          600: '#ff7800',
          700: '#e56900',
          800: '#c2410c',
          900: '#9a3412',
        },
        gray: {
          500: '#6b7280', // light mode
        }
      }
    },
  },
  plugins: [],
}
