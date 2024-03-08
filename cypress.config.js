const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "5n2krk",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://lojaebac.ebaconline.art.br',
    video: true,
  },
});
