import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["var(--font-orbitron)"],
        "space-grotesk": ["var(--font-space-grotesk)"],
        mono: ["monospace"],
      },
      colors: {
        "game-red": {
          500: "#FF2D55",
          600: "#FF0A3C",
          700: "#DB002F",
        },
        "game-purple": {
          500: "#6C2BD9",
          600: "#5620B0",
          700: "#401887",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s infinite",
        float: "float 6s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  darkMode: "class",
};

export default config;
