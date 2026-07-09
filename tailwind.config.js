/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0b1326",
        background: "#0b1326",
        "on-surface": "#dae2fd",
        primary: "#d2bbff",
        "primary-container": "#7c3aed",
        "on-primary": "#3f008e",
        "on-primary-container": "#ede0ff",
        secondary: "#ddfcff",
        "secondary-container": "#00f1fe",
        "secondary-fixed": "#74f5ff",
        tertiary: "#e9c400",
        "tertiary-container": "#c9a900",
        error: "#ffb4ab",
        "error-container": "#93000a",
        outline: "#958da1",
        "outline-variant": "#4a4455",
        "surface-variant": "#2d3449",
        "on-surface-variant": "#ccc3d8",
        "surface-container-lowest": "#060e20",
        "surface-container-low": "#131b2e",
        "surface-container": "#171f33",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",
        "surface-bright": "#31394d",
        "inverse-surface": "#dae2fd",
        "inverse-on-surface": "#283044",
        "valo-red": "#ff4655",
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "slide-up": "slide-up 0.3s ease-out both",
        "pulse-red": "pulse-red 1s infinite",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-red": {
          "0%":   { boxShadow: "0 0 0 0 rgba(255,70,85,0.7)" },
          "70%":  { boxShadow: "0 0 0 10px rgba(255,70,85,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255,70,85,0)" },
        },
      },
    },
  },
  plugins: [],
};
