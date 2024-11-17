/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'pale-gray': '#929292',
        'pale-purple': '#CBCEE9',
        'purple': '#3F51B5',
      },
    },
  },
  plugins: [],
}