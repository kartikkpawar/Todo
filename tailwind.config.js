/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg": "#0D0D0D",
        "todo-bg": "#242B2E",
        "todo-green": "#4DD637",
        "todo-purple": "#8D3DAF",
      },
    },
  },
  plugins: [],
};
