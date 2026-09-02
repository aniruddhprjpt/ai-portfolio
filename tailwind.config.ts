import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body:    ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        brand: {
          bg:        "oklch(0.07 0.000 0)",
          surface:   "oklch(0.12 0.008 52)",
          surface2:  "oklch(0.17 0.010 52)",
          border:    "oklch(0.22 0.010 52)",
          ink:       "oklch(0.95 0.010 80)",
          muted:     "oklch(0.48 0.015 52)",
          primary:   "oklch(0.72 0.17 52)",
          accent:    "oklch(0.70 0.15 192)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
