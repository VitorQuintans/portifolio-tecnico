const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    trashAssetsBeforeRuns: false,
    retries: {
      runMode: 2,
      openMode: 0
    },

    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      return config;
    },
  },
});