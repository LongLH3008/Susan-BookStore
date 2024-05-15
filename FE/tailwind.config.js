const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
    backgroundImage: {
      "banner-blog": `url('./src/assets/img/headerBlog.webp')`,
      "banner-home1": `url('./src/assets/img/HeaderBanner (1).png')`,
      "banner-home2": `url('./src/assets/img/HeaderBanner (2).png')`,
      "banner-home3": `url('./src/assets/img/HeaderBanner (3).png')`,
      "banner-home4": `url('./src/assets/img/HeaderBanner (4).png')`,
      "banner-home6": `url('./src/assets/img/HeaderBanner (6).png')`,
    },
  },
  plugins: [flowbite.plugin()],
};
