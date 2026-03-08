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
        serif: ["Georgia", "serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
      },
      colors: {
        cream: "#f8f5f0",
        "warm-gray": "#6b635b",
        terracotta: "#c17f59",
        sage: "#8fa68c",
        charcoal: "#2d2a26",
      },
    },
  },
  plugins: [],
};

export default config;
