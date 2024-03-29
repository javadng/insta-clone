/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        around: "0 0 0.6rem  rgba(0, 0, 0, 0.1)",
      },
      gridTemplateColumns: {
        navigation: "minmax(10rem, 20rem) 1fr",
        posts: "repeat(auto-fit, minmax(20rem, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
