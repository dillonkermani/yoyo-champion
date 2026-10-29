import type { Config } from "tailwindcss";
import preset from "../../packages/config/tailwind/preset";

const config: Config = {
  presets: [preset],
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Storefront palette: deep navy ink on white, aqua as the single accent.
      colors: {
        ink: "#0B1F33",
        slate: "#5B6B7A",
        aqua: { DEFAULT: "#1CB0F6", deep: "#0B8ED1", soft: "#DDF3FD" },
        sky: "#EAF7FE",
        line: "#E3EDF3",
        gold: "#FFC800",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
