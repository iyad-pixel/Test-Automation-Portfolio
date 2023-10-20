const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.amazon.com/',
    retries: 1,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
