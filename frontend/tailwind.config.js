/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#09090b", // Dark theme background
        foreground: "#fafafa",
        primary: {
          DEFAULT: "#0ea5e9", // cyan/blue accent
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#27272a",
          foreground: "#fafafa",
        },
        card: {
          DEFAULT: "rgba(39, 39, 42, 0.4)", // glass hybrid
          foreground: "#fafafa",
        },
        border: "#27272a",
      },
    },
  },
  plugins: [],
}
