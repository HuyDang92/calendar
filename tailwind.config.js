/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1538px',
      },
      fontSize: {
        '2xs': '0.5rem',
      },
      colors: {
        lightBlue: '#5684AE',
        darkBlue: '#0F4C81',
        lightOrange: '#E9A89B',
        darkOrange: '#FF9800',
        titleColor: '#E4F6ED',
      },
      boxShadow: {
        'border-light': '0px 0px 31px -3px rgba(0,0,0,0.2)',
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
