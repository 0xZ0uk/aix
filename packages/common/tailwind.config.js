const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", ...fontFamily.sans],
        body: ["var(--font-inter)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
