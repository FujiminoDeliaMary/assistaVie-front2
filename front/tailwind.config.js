/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myCustomColor: {
          primaryC: '#0176D3',
          textC: '#0E0036', // Couleur par défaut
          sosC: '#D10000', // Couleur foncée
        },
    },
    },
    fontFamily: {
      'body': ['"Open Sans"'],
    }
  },
  plugins: [],
}

