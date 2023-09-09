// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './RegistrationUtils'
import './ApiUtils'
import 'cypress-mochawesome-reporter/register'
beforeEach(() => {
  cy.viewport(2000, 1200)
  cy.setCookie('CookieConsent', '/*/')
  cy.setCookie('_scid_r', '/*/')
  cy.setCookie('_scid', '/*/')
})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

// Alternatively you can use CommonJS syntax:
// require('./commands')
