/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          red: "#ff6347",
          yellow: "#ffd700",
          orange: "#ff8c00",
        },
        neutral: {
          gray: "#808080",
          white: "#ffffff",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
};
