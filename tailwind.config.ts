import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        c: {
          bg: "#F5F9FA",
          surface: "#FFFFFF",
          ink: "#0C2229",
          muted: "#4F6970",
          accent: "#0A6F7E",
          accentDark: "#07535F",
          line: "#D5E4E8",
          tint: "#E3F1F3",
        },
        t: {
          roast: "#261710",
          roastSoft: "#3A2418",
          dough: "#F1E4CF",
          paper: "#FBF4E6",
          ember: "#C4501F",
          emberDark: "#9E3B12",
          moss: "#4D5A2F",
          clay: "#7A5A45",
        },
        d: {
          paper: "#EEF0F2",
          white: "#FFFFFF",
          navy: "#14233F",
          blue: "#1F4E8C",
          rule: "#B9C0CA",
          slate: "#4A5568",
        },
      },
      fontFamily: {
        clinicaDisplay: ["'Schibsted Grotesk Variable'", "system-ui", "sans-serif"],
        clinicaText: ["'Public Sans Variable'", "system-ui", "sans-serif"],
        tostadorDisplay: ["'Young Serif'", "Georgia", "serif"],
        tostadorText: ["'Work Sans Variable'", "system-ui", "sans-serif"],
        despachoDisplay: ["'Source Serif 4 Variable'", "Georgia", "serif"],
        despachoText: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
      },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        bean: { "0%": { transform: "translateY(-20px) rotate(0deg)", opacity: "0" }, "20%": { opacity: "1" }, "100%": { transform: "translateY(380px) rotate(160deg)", opacity: "0" } },
      },
      animation: {
        rise: "rise .35s ease-out both",
        bean: "bean 3.2s ease-in infinite",
      },
    },
  },
  plugins: [],
};
export default config;
