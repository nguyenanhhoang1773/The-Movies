/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      mb: { min: "326px", max: "480px" },
      // => @media (min-width: 640px) { ... }

      tab: { min: "480px", max: "1023px" },
      // => @media (min-width: 1280px) { ... }
      lg: { min: "1024px", max: "1280px" },
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
    },
  },
  plugins: [],
};
