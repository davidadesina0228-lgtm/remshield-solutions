import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#080E1E",
        "navy-light": "#0D1B3E",
        electricBlue: "#00AAFF",
        teal: "#00D4C8",
        circuit: "#00D4D8",
        surface: "#0D1530",
        "surface-2": "#111e40",
        silver: "#C8D6E5",
      },
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 4s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
