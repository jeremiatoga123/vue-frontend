/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'body': '#ecf4f3'
      },
      colors: {
        'primary': '#2dce89',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require("tw-elements/dist/plugin.cjs"),
  ],
}

