/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-fixed": "#ffdea5",
        "on-tertiary-container": "#86847e",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#e5e2e1",
        "outline-variant": "#c4c7c7",
        "surface-bright": "#fdf8f8",
        "surface-dim": "#ddd9d8",
        "background": "#fdf8f8",
        "primary": "#000000",
        "on-surface": "#1c1b1b",
        "surface-container-high": "#ebe7e6",
        "surface": "#fdf8f8",
        "surface-container": "#f1edec"
      },
      fontFamily: {
        "label-caps": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-lg": ["Bodoni Moda", "serif"],
        "display-lg": ["Bodoni Moda", "serif"],
        "title-lg": ["Inter", "sans-serif"],
        "headline-md": ["Bodoni Moda", "serif"]
      }
    }
  },
  plugins: [],
}
