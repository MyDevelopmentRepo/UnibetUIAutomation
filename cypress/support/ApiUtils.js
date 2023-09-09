Cypress.Commands.add('ValidateSportDetails', function (domain) {
  const url = domain + '/sportsbook-feeds/views/sports/a-z'
  const callsToIntercept = [] // array to hold list of the intercept calls which have to be intercepted
  cy.request('GET', url).then((response) => { // Send request to domain url to fetch the sports list from the response

    console.log('Verifying Sports of the domain - ' + url)
    const SportsList = response.body.layout.sections[1].widgets[0].sports

    for (let i = 0; i < SportsList.length; i++) { // loop through the sports List 
      const iconUrl = SportsList[i].iconUrl
      expect(SportsList[i].name).to.match(/([\w\d\s])+([\w\d\s])*/) // name is alphanumeric
      expect(SportsList[i].boCount).to.be.gte(0) // bo count is positive integer
      expect(SportsList[i].iconUrl.indexOf('https://')).to.be.eq(0)
      expect(SportsList[i].iconUrl.indexOf('.svg')).to.be.eq(iconUrl.length - 4)
      console.log("'@call'" + i + iconUrl)
      cy.intercept('GET', iconUrl , {headers: { 'Content-Type': 'image/svg+xml' },failOnStatusCode: false}).as('call' + i) // declate the intercept for all the calls
      callsToIntercept.push('@call' + i) // put the intercept alias into the array
    }

    cy.visit(domain + '/betting/sports/home')
    cy.wait(callsToIntercept, {timeout: 8000}).then(AllCalls => {
      AllCalls.forEach(ele => {
        expect(ele.response.statusCode).to.eq(200) // response 200 so  a valid url
        expect(ele.response.headers['Content-Type']).to.eq('image/svg+xml') // response content type is image, so a valid image
      })
    })
  })
})
