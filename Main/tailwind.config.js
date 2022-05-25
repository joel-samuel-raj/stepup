module.exports = {
  mode: "jit",
  important : true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'hero-image': "url('/background.webp')",
      },
      colors: {
        // primary: "#0459CF",
        // highlighted: "#4AC1F3",
        // Background: "#112036",
        // ButtonColor: "#0459CF",
        // BackgroundSecondary: "#071A2F",
      },
      fontFamily: {
        'Roboto': ['Roboto', 'ui-serif'],
        'Oswald': ['Oswald', 'ui-serif'],
      },
      maxWidth: {
        'screen-3xl': '1920px',
      },
      screens: {
        '3xl': '1920px',
        // => @media (min-width: 992px) { ... }
      }
    },
  }
}