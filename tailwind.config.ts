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
    "bg-retroDark-400",
    "rounded-lg",
    "peer",
  ], // Ensure Tailwind compiles these
  theme: {
    extend: {
      colors: {
        highlight: "#9ca9ff", // Custom vibrant purple
        alert: "#DC2626", // Custom red color for alerts/errors
        warning: "#FF7F50", // Retro coral orange for warnings
        info: "#5B7AAE", // Muted steel blue for info messages
        retroDark: {
          100: "#0d0e1c", // Very dark blue-gray background (almost black)
          200: "#10182a", // Darker blue-gray for subtle contrast
          300: "#141f38", // Deeper, darker blue-gray for shadows
          400: "#3a4a75", // Darker medium blue-gray for softer contrast
          500: "#6071a1", // Retro blue, a bit muted but still noticeable
          accent: "#7189FF", // Neon blue accent (same as before for that Pac-Man glow)
          "accent-hover": "#5C74E6", // Slightly darker neon blue for hover effect
          "accent-active": "#4B63E1", // Even darker neon blue for active state
        },
        retroText: {
          light: "#e0e0e0", // Light gray text for good contrast
          primary: "#ffffff", // White text for maximum visibility
          accent: "#7189FF", // Neon blue text (can use for highlighting)
        },
      },
      fontFamily: {
        retro: ["'Oxanium'", "cursive"], // Retro font
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "fade-in-down": "fade-in-down 0.3s ease-in-out",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, -100%, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
