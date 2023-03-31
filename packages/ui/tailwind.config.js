/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/*.tsx"],
  theme: {},
  // @ts-ignore
  presets: [require("@aix/common/tailwind.config.js")],
};

module.exports = config;
