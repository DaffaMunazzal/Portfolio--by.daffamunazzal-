/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary palette
        void: "#0A0A0A",
        surface: "#141414",
        "surface-2": "#1A1A1A",
        "surface-3": "#242424",
        // Text
        bone: "#F5F5F0",
        "bone-dim": "#D4D4CE",
        muted: "#A0A0A0",
        faint: "#606060",
        // Accent
        "red-drama": "#D91E1E",
        "red-deep": "#B8141C",
        "red-glow": "#FF2929",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "Anton", "Impact", "sans-serif"],
        heading: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Poster-scale titles
        "poster-sm": "clamp(2.5rem, 6vw, 5rem)",
        "poster-md": "clamp(3.5rem, 8vw, 7rem)",
        "poster-lg": "clamp(4rem, 10vw, 9rem)",
        "poster-xl": "clamp(5rem, 14vw, 13rem)",
      },
      letterSpacing: {
        "ultra-wide": "0.3em",
        "mega-wide": "0.5em",
        "poster": "0.08em",
      },
      animation: {
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        "pulse-red": "pulse-red 3s ease-in-out infinite",
        "grain": "grain-shift 0.5s steps(2) infinite",
        "spin-slow": "spin 12s linear infinite",
        "blink": "blink 1.2s step-end infinite",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(12px)" },
        },
        "pulse-red": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-2px, 2px)" },
          "50%": { transform: "translate(2px, -2px)" },
          "75%": { transform: "translate(-1px, -1px)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in": "cubic-bezier(0.7, 0, 0.84, 0)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      boxShadow: {
        "red-glow": "0 0 40px 10px rgba(217, 30, 30, 0.3)",
        "red-glow-sm": "0 0 20px 5px rgba(217, 30, 30, 0.2)",
        "card": "0 4px 32px rgba(0, 0, 0, 0.6)",
        "card-hover": "0 8px 60px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
