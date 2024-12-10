import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-highlight",
    "bg-retroDark-accent",
    "peer-checked:bg-retroDark-accent",
    "bg-retroDark-300",
    "rounded-lg",
    "peer",
  ], // Ensure Tailwind compiles these
  theme: {
    extend: {
      colors: {
        highlight: "#8A99FF", // Custom vibrant purple
        retroDark: {
          100: "#0d0e1c", // Very dark blue-gray background (almost black)
          200: "#10182a", // Darker blue-gray for subtle contrast
          300: "#141f38", // Deeper, darker blue-gray for shadows
          400: "#3a4a75", // Darker medium blue-gray for softer contrast
          500: "#6071a1", // Retro blue, a bit muted but still noticeable
          accent: "#7189FF", // Neon blue accent (same as before for that Pac-Man glow)
          "accent-hover": "#5C74E6", // Slightly darker neon blue for hover effect
        },
        retroText: {
          light: "#e0e0e0", // Light gray text for good contrast
          primary: "#ffffff", // White text for maximum visibility
          accent: "#7189FF", // Neon blue text (can use for highlighting)
        },
      },
      fontFamily: {
        retro: ["'Source Code Pro'", "cursive"], // Retro font
      },
    },
  },
  plugins: [],
} satisfies Config;