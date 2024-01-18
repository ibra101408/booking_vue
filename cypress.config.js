module.exports = {
    // Your Cypress configurations go here
    // For more options, see: https://docs.cypress.io/guides/references/configuration

    // By default, Cypress looks for test files in the "cypress/integration" directory
    // You can customize this if needed
    // Specify the browser to run tests in (optional)
    // browser: 'chrome',
    // Headless mode (run tests without opening the browser)
    // By default, Cypress runs in headed mode (browser opens)
    // headless: true,
    // Other configurations...
    // Custom configuration options...
    // Your other configurations...
    e2e: {
        specPattern: 'cypress/integration/*.js',
    },

};