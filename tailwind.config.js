const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      'green': {
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
        950: '#042f2e',
      },
    },
    extend: {
      boxShadow: {
        '3xl': '0px 0px 5px 5px rgba(0,0,0, 0.5)',
      }
    },
  },
  plugins: [],
}
