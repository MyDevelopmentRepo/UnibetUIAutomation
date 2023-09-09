import register from '../Locators/registration'

describe('Registration Tests', () => {

  before(() => {
    cy.setCookie('CookieConsent', '/*/')
    cy.setCookie('_scid_r', '/*/')
    cy.setCookie('_scid', '/*/') // setting cookies explicitly as for some reason they are not getting set for this page and accept all box is coming
    cy.fixture('registrationTestData').as('testData')
    cy.intercept('GET', '/bonuscampaign/external/campaigns?brand=unibet&jurisdiction=UK&locale=en_GB').as('Promos')
    cy.visit('/registration')
    cy.wait('@Promos')
  })

  it('Verify a user is able to complete registration', function () {
    // Verify title
    cy.title().should('eq', 'Register with Unibet Today')

    // ****************Verify Promotions page*****************************************************
    // If promos are there then verify that first promo is selected
    cy.get(register.selectPromotion.promotion).should('be.visible').should('have.length.greaterThan', 0).eq(0).then((promo) => {
      cy.get(promo).find("div[data-dn='selected-button']").should('be.visible')
    })

    // verify button I want offer, 
    cy.get(register.selectPromotion.SubmitButton).should('be.visible').and('have.css', 'background-color', 'rgb(255, 231, 31)').and('have.css', 'color', 'rgb(17, 17, 17)')

    // Click Skip
    cy.get(register.selectPromotion.skip).should('be.visible').click()

    // ****************Verify Create Account page*************************************************
    // verify Continue button is disabled initally when no data populated
    cy.contains(register.createAccount.SubmitButton, 'Continue').should('exist').and('have.attr', 'disabled')

    // Verify Email
    cy.validateEmail('validEmails')
    cy.validateEmail('invalidEmails')

    // Populate test Data
    cy.get(register.createAccount.registerationForm).as('registerForm') // as is used to avoid render issue
    cy.get('@registerForm').should('be.visible')
    cy.get(register.createAccount.progressBubble).as('progressBubble')
    cy.get('@progressBubble').eq(0).should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)') // first bubble is marked green
    cy.get(register.createAccount.firstName).should('be.visible').type(this.testData.firstName)
    cy.get(register.createAccount.lastName).should('be.visible').type(this.testData.lastName)
    cy.get(register.createAccount.passsword).should('be.visible').type(this.testData.password)
    cy.get(register.createAccount.dateSelect).should('be.visible').select(this.testData.date)
    cy.get(register.createAccount.monthSelect).should('be.visible').select(this.testData.month)
    cy.get(register.createAccount.yearSelect).should('be.visible').select(this.testData.year)
    cy.get(register.createAccount.genderSelect).should('be.visible').select(this.testData.gender)
    cy.contains(register.createAccount.SubmitButton, 'Continue').should('exist').and('have.attr', 'disabled') // Once again verify that continue button is diabled before populating last field
    cy.validateEmail('invalidEmailsOnContinue') // Validate the invalidemail on click of Continue
    cy.get(register.createAccount.email).should('be.visible').clear().type(this.testData.email)
    cy.get(register.createAccount.continueButton).should('be.visible').click()

    // ****************Verify Create Account Second Page******************

    cy.get('@registerForm').should('be.visible')
    cy.get(register.createAccount.progressBubbleSvg).should('exist') // first bubble is ticked, verify the tick mark
    cy.get('@progressBubble').eq(1).should('be.visible').and('have.css', 'color', 'rgb(255, 255, 255)') // veridy second bubble is green marked
    cy.contains(register.createAccount.SubmitButton, 'Join').should('exist').and('have.attr', 'disabled')
  })
})
