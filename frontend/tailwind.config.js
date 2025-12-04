/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        logoBlue: '#009fe3', 
        logoBlueShadow: '#0073b9',
      },
    },
  },
  plugins: [],
}

