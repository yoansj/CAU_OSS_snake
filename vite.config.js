// vite.config.js
const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        scores: resolve(__dirname, "scores/index.html"),
        game: resolve(__dirname, "game/index.html"),
      },
    },
  },
});
