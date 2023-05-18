const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '5jcwg3',
  defaultCommandTimeout: 2500,
  chromeWebSecurity: false,
  e2e: {
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
   
  },
});
