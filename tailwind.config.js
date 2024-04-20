/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      flexGrow: {
        2: '2'
      }
    },
    fontFamily: {
      abc: ["acumin-pro", "sans-serif"],
      pop: ["poppins", "sans-serif"],
    },
  },
  plugins: [],
}

