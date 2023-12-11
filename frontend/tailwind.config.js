/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'display': ['Bebas Neue', 'serif'],
        'content': ['Open Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

