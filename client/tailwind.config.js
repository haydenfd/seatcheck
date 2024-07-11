const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ucla-gold": "#FFD100",
        "ucla-blue": "#2774AE",
      },
      boxShadow: {
        'subtle': '0 4px 12px rgba(255, 179, 0, 0.5)',
      },
    },
  },
  plugins: [nextui()],
};
