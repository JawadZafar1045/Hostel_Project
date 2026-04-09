/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#EBF4FF",
          100: "#D6E9FF",
          200: "#ADD3FF",
          300: "#85BCFF",
          400: "#4D96E8",
          500: "#1A7FED",
          600: "#0064D9", // PRIMARY — use this for all main actions
          700: "#0057BE",
          800: "#004FAD", // HOVER state
          900: "#003C82",
        },
        amber: {
          100: "#FEF3C7",
          300: "#FCD34D",
          500: "#F59E0B", // ACCENT — stars, featured labels
          600: "#D97706",
        },
        trust: {
          DEFAULT: "#059669",
          light: "#D1FAE5",
        },
        surface: "#FAFAF9",
        ink: {
          DEFAULT: "#111827",
          mid: "#374151",
          muted: "#6B7280",
          faint: "#9CA3AF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        blue: "0 4px 14px rgba(0,100,217,0.22)",
        "blue-sm": "0 2px 8px rgba(0,100,217,0.15)",
        card: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)",
      },
      animation: {
        "fade-up": "fadeUp 0.35s ease both",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
