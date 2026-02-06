/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(135deg, #ffffff, #fde2e4)',
        'dark-gradient': 'linear-gradient(135deg, #020617, #020617)',
      },
    },
  },
  plugins: [],
}
