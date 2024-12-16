/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "var(--secondary)",
        backgroundprimary: "var(--background-primary)",
        backgroundsecondary: "var(--background-secondary)",
        text: "var(--text)",
        textsecondary: "var(--text-secondary)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        boxshadow: "var(--box-shadow)",
      },
    },
    screens: {
      usm: "200px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
  },
  plugins: [],
};
