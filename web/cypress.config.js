const { defineConfig } = require("cypress");
require('dotenv').config({ path: '../.env' });

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,

    setupNodeEvents(on, config) {
      return config;
    },
  },
});