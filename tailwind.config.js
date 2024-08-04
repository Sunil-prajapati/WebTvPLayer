/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        antique: {
          100: "#FFEDD7",
        },
        green: {
          100: "#EAFFE0",
          200: "#B9FF98",
          300: "#03B4B4",
          400: "#C8D9C9",
        },
        blue: {
          100: "#D7E6FF",
          200: "#98C0FF",
        },
        silver: {
          100: "#C0C0C0",
        },
        pink: {
          200: "#FEBCBC",
          100: "#FEBEBE",
          300: "#FFE3E3",
        },
        grey: {
          100: "#7B7B7B",
          200: "#2C2E2B",
        },
        yellow: {
          100: "#FFCA7A",
        },
        red: {
          100: "#840000",
          200: "#FF9191",
        },
        lightColor: {
          100: "rgba(152, 192, 255, 0.2)",
          200: "rgba(255, 202, 122, 0.2)",
          300: "rgba(185, 255, 152, 0.2)",
          400: "rgba(255, 145, 145, 0.2)",
        },
        rgbaColor: {
          100: "rgba(123, 123, 123, 0.50)",
          200: "rgba(255, 255, 255, 0.15)",
          300: "rgba(203, 1, 1, 0.80)",
        },
        darkColor: {
          100: "rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
  plugins: [],
};
