/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        giraffe: {
          100: "#F0ECE1",
          300: "#EDCF8F",
          500: "#C97F4E",
          900: "#6F4A38",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
