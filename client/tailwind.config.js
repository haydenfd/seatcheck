const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ucla-gold": "#FFD100",
        "ucla-blue": "#2774AE",
      },
      boxShadow: {
        subtle: "0 4px 12px rgba(255, 179, 0, 0.5)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}