import register from '../Locators/registration'

Cypress.Commands.add('validateEmail', function (type) {
  if (type == 'invalidEmails') { // check invalid emails which give error immediately 
    const errorList = this.testData.invalidEmails
    errorList.forEach(ele => {
      cy.get(register.createAccount.email).should('be.visible').clear().type(ele.id)
      cy.get(register.createAccount.emailErrorMsg).should('be.visible').should('have.text', ele.errormsg) // veriy the failure message is visible
    })
  }else if (type == 'validEmails') { // check valid emails
    const emailList = this.testData.validEmails
    emailList.forEach(ele => {
      cy.get(register.createAccount.email).should('be.visible').clear().type(ele.id)
      cy.get(register.createAccount.emailSuccessIcon).should('be.visible') // verify that for the valid emails, the success tick icon is visible
    })
  }else if (type == 'invalidEmailsOnContinue') { // check the emails which give error when continue is clicked
    const emailList = this.testData.invalidEmailsOnContinue
    emailList.forEach(ele => {
      cy.get(register.createAccount.email).should('be.visible').clear().type(ele.id)
      cy.get(register.createAccount.continueButton).should('be.visible').click()
      cy.get(register.createAccount.email).invoke('prop', 'validationMessage').then(text => { // get the text from the information box
        expect(text).to.be.equal(ele.errormsg)
      })
    })
  }
})
