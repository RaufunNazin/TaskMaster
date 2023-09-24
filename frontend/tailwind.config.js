/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comic: ['comic', 'sans'], // Use the same font family name as defined in the @font-face rule
      },
    },
  },
  plugins: [],
};
