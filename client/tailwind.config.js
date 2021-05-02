module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        neutrals: {
          100: "#ECEEEF",
          200: "#DFE1E3",
          300: "#3F3F46"
        },
        primary: {
          blue: "#3B82F6",
        },
      },
      fontFamily: {
        inter: ["Inter", "ui-serif"],
        roboto: ["Roboto", "ui-serif"],
      },
      maxWidth: {
        '1/2': '50%',
        '4/5': "80%",
       } 
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
