/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        script: ["Caveat", "cursive"],
      },
      colors: {
        bg: "#06080F",
        ink: "#E9ECF5",
        mist: "#A6AFC4",
        mist2: "#8891A8",
        mist3: "#6C7590",
        mist4: "#C3CADB",
        hair: "#171C2C",
        hair2: "#2A3145",
        accent: {
          DEFAULT: "#2FD87A",
          hover: "#7BEBAC",
          ink: "#04160B",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(135deg, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)",
      },
    },
  },
  plugins: [],
};
