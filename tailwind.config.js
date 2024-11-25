/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1782cf",
        primaryBg: "#F5F7FA",
      },
      fontFamily: {
        lato: "Lato, sans-serif",
      },
    },
  },
  plugins: [],
};
