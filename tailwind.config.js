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
      boxShadow: {
        "custom-one":
          "4.17188px 4.17188px 8.34375px rgba(0, 0, 0, 0.25), inset 0px -4.17188px 8.34375px rgba(0, 0, 0, 0.25)",
        "custom-two":
          "inset -4.17188px -6.25781px 4.17188px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
