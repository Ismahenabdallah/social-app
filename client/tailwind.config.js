module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Playfair Display',
      body: 'Work Sans',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '3rem',
      },
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '999px',
      // => @media (min-width: 999px) { ... }

      'lg': '1000px',
      // => @media (min-width: 1000px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      content: {
        
       
      },
      colors: {
       primary: '#1857a4',
      orange: 'rgb(245,133,41)',
      rose:'rgba(221,42,123,1)',
      move:' rgba(129,52,175,1)',
       //linear-gradient(90deg, rgba(245,133,41,1) 0%, rgba(221,42,123,1) 50%, rgba(129,52,175,1) 100%)',
   
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        adelia: ["ADELIA", "cursive"],
      },
    },
  },
  plugins: [],
};
