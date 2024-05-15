const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
    backgroundImage: {
      "banner-blog": `url('./src/assets/img/headerBlog.webp')`,
    },
  },
  plugins: [flowbite.plugin()],
};
