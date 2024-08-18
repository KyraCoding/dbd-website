/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"roboto mono"', "sans-serif"],
      },
      colors: {
        celeste: "#B9FAF8",
        columbia: "#B8D0EB",
        wisteria: "#B8D0EB",
        amethyst: "#A663CC",
        grape: "#6F2DBD",
      },
      animation: {
        fadein: "fadein ease-in-out forwards",
        fadeout: "fadeout ease-in-out forwards",
      },
      keyframes: (theme) => ({
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeout: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        }
      }),
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animate-duration": (value) => ({
            animationDuration: value,
          }),
        },
        { values: theme("transitionDuration") }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-delay': (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme('transitionDelay') }
      )
    }),
    require("@tailwindcss/aspect-ratio"),
  ],
};
