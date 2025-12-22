/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.{js,jsx,ts,tsx}", "./cpmponents/**/*.{js,jsx,ts,tsx}", "./navigation/**/*.{js,jsx,ts,tsx}", "./screen/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      fontFamily: {
        iransans: ['Irsans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
        nunitosans: ['NunitoSans', 'sans-serif'],
        daysone: ['DaysOne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}