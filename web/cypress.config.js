const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
require('dotenv').config({ path: '../.env' });

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,

    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      return config;
    },
  },
});