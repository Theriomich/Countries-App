/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {responsive: true,},
    screens: {
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
  },
  
  plugins: [],
}

