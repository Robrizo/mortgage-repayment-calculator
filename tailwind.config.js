/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      appearance: 'none',
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        primary: 'hsl(61, 70%, 52%)',
        redColor: 'hsl(4, 69%, 50%)',
      },
    },
  },
  plugins: [],
}
