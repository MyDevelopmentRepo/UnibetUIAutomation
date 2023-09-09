const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    // implement node event listeners here
    },
    baseUrl: 'https://www.unibet.co.uk',
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,
    domains: [
      'https://www.unibet.se',
      'https://www.unibet.com'
    ]
  }
})
