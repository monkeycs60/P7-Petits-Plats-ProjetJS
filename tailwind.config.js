/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./scripts/app.js",
    "./scripts//utils/recipeCardFactory.js",
  ],
  theme: {
    extend: {},
  },

  // ...
  plugins: [
    // ...
    require("@tailwindcss/line-clamp"),
  ],
};
