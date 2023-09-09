describe('URL validation ', () => {
  before(() => {
    cy.fixture('/Request/uk_request').as('RequestData')
    cy.fixture('/Response/uk_response').as('ResponseData')
  })

  it('Verify URl request & response', function () {
    cy.intercept('GET', '/kambi-rest-api/gameLauncher2.json?*').as('gameLauncher')
    cy.visit('/betting/sports/home')
    cy.wait('@gameLauncher').then((gameCall) => {

      // Request  Verification
      expect(this.RequestData.brand).to.eq(gameCall.request.query.brand)
      expect(this.RequestData.locale).to.eq(gameCall.request.query.locale)

      // Response  Verification
      expect(gameCall.response.statusCode).to.eq(200)
      expect(this.ResponseData.lang).to.eq(gameCall.response.body.lang)
      expect(this.ResponseData.jurisdiction).to.eq(gameCall.response.body.jurisdiction)
      expect(this.ResponseData.market).to.eq(gameCall.response.body.market)
      expect(this.ResponseData.currency).to.eq(gameCall.response.body.currency)
    })
  })

  it('Verify sport Details', () => {
    cy.ValidateSportDetails(Cypress.config('baseUrl'))
    Object.values(Cypress.config('domains')).forEach((ele) => { // fetching array of values from JS object and looping through it
      cy.ValidateSportDetails(ele)
    })
  })
})
