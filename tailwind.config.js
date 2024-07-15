/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "custom-bg": "#465462",
      "custom-bg-hover": "#768A9E",
      white: "white",
      aliceblue: "#F0F8FF",
      "yellow-400": "#facc15",
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
