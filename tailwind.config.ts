import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#5f5e60",
        "on-secondary": "#f9f8ff",
        "on-surface-variant": "#596065",
        "surface-container-high": "#e4e9ee",
        "error": "#9f403d",
        "primary-dim": "#535254",
        "secondary-dim": "#0050ab",
        "on-error-container": "#752121",
        "error-container": "#fe8983",
        "background": "#f8f9fc",
        "on-error": "#fff7f6",
        "error-dim": "#4e0309",
        "tertiary-container": "#f4f3f8",
        "inverse-surface": "#0c0e10",
        "on-primary-fixed-variant": "#5c5b5d",
        "on-secondary-fixed": "#003d85",
        "surface-container": "#ebeef2",
        "secondary-container": "#d8e2ff",
        "on-tertiary": "#faf8fe",
        "outline-variant": "#acb3b8",
        "primary-fixed": "#e4e2e4",
        "on-tertiary-fixed-variant": "#65666a",
        "surface-container-lowest": "#ffffff",
        "tertiary-fixed": "#f4f3f8",
        "surface-variant": "#dde3e9",
        "surface-container-highest": "#dde3e9",
        "on-tertiary-fixed": "#49494e",
        "on-surface": "#2d3338",
        "outline": "#757c81",
        "tertiary": "#5e5f63",
        "surface": "#f9f9fb",
        "tertiary-fixed-dim": "#e6e5ea",
        "tertiary-dim": "#525357",
        "on-background": "#2d3338",
        "surface-container-low": "#f2f4f6",
        "primary-container": "#e4e2e4",
        "on-primary": "#faf7f9",
        "inverse-primary": "#ffffff",
        "surface-tint": "#5f5e60",
        "secondary-fixed": "#d8e2ff",
        "on-secondary-container": "#004ea8",
        "secondary-fixed-dim": "#c2d4ff",
        "on-secondary-fixed-variant": "#0058bb",
        "surface-dim": "#d3dbe2",
        "primary-fixed-dim": "#d6d3d6",
        "on-primary-container": "#525154",
        "inverse-on-surface": "#9c9d9f",
        "secondary": "#005bc2",
        "on-tertiary-container": "#5b5b60",
        "surface-bright": "#f9f9fb",
        "on-primary-fixed": "#3f3f41"
      },
      fontFamily: {
        "headline": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"],
        "serif": ["Playfair Display", "serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem", 
        "lg": "0.5rem", 
        "xl": "0.75rem", 
        "full": "9999px"
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require("@tailwindcss/typography"),
  ],
};
export default config;
