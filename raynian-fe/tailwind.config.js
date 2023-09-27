/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"'],
      },
      boxShadow: {
        panel: "8px 8px 1px",
        modal: "8px 8px 10px rgba(0, 0, 0, 0.5)",
      },
      // fontSize: {
      //   popup: "1rem",
      // },
    },
  },
  darkMode: "class",
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
