const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    blur: {
      500: "#00000080",
      600: "#00000099",
      800: "#000000cc",
    },
  },
};

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // colors: colors,
    extend: {
      colors,
      backgroundImage: {
        'custom-one': "linear-gradient(180deg, #fda3ff 0%, #f4bfff 29.69%, #9949ff 100%)",
        'custom-two': "linear-gradient(149.29deg, #f265e4 0.79%, #6664ed 51.24%, #5200ff 98.64%)",
      },
      boxShadow: {
        'custom-one': "4.17188px 4.17188px 8.34375px rgba(0, 0, 0, 0.25), inset 0px -4.17188px 8.34375px rgba(0, 0, 0, 0.25)",
        'custom-two': "inset -4.17188px -6.25781px 4.17188px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
