/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      green: "#03c04a",
      orange: "#fa8128",
      white: "#ffffff",
      purple: "#3f3cbb",
      blue: "#1791c8",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3A8EBF",
      "tahiti-shade": "#3A95BF71",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      grey: "#f5f5f5",
      main: "#f1f1f1",
      "black-shade": "#AAAAAA",
      black: "#000000",
      "alley-blue": "#F0F8FF",
      red: "#ff3333",
    },
    fontFamily: {
      "open-sans": ["Open Sans", "sans-serif"],
      "noto-sans": ["Noto Sans", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      neuton: ["Neuton", "serif"],
    },
    transitionDuration: {
      DEFAULT: "300ms",
      fast: "150ms",
      slow: "800ms",
      moderate: "500ms",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
