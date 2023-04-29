/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  darkMode: 'media',
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}'
    ],
    options: {
      safelist: {
        standard: [/^bg-/, /^text-/],
      },
    },
  },
  content: [],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#FCE4EC',
          100: '#FCE4EC',
          200: '#F48FB1',
          300: '#F06292',
          400: '#EC407A',
          500: '#E91E63',
          600: '#D81B60',
          700: '#C2185B',
          800: '#AD1457',
          900: '#880E4F',
        },
        ...colors,
      },
      typography: {
        DEFAULT: {
          css: {
            pre: null
          },
        },
      },
    },


  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}