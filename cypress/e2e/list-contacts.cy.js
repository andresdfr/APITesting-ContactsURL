const contactData = require('../fixtures/contactData.json')

describe('API Tsting Contact List Examples', () => {
  it('Get complete contact list', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env("endpointContacts"),
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.statusText).to.equal("OK")
      // expect(response.duration).to.be.lessThan(10000)
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
    })
  })

  it('POST new contact generic one with info in fixture', function () {
    cy.request({
      method: 'POST',
      url: Cypress.env("endpointContacts"),
      body: contactData.postData
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.statusText).to.equal("OK")
      expect(response.duration).to.be.lessThan(3000)
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')

      // save the contactID to use it in further tests
      cy.wrap(response.body._id).as('contactID')
    })
  })

  it('GET contact {ID}', function () {
    // the contactID saved in the previous test is used in this one, same thing it's going to happen is future tests
    cy.request({
      method: 'GET',
      url: Cypress.env("endpointContacts") + this.contactID,
    }).then(response => {
      console.log(response.body)
      expect(response.status).to.equal(200)
      expect(response.statusText).to.equal("OK")
      expect(response.duration).to.be.lessThan(3000)
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')

      expect(response.body.firstName).to.equal(contactData.postData.firstName)
      expect(response.body.location.country).to.equal(contactData.postData.location.country)
      expect(response.body.location).to.deep.equal(contactData.postData.location)
    })
  })

  it('PUT contact {ID}', function () {
    cy.request({
      method: 'PUT',
      url: Cypress.env("endpointContacts") + this.contactID,
      body: contactData.putData
    }).then(response => {
      console.log(response)
      expect(response.status).to.equal(204)
      expect(response).not.to.have.property('body')
      expect(response.duration).to.be.lessThan(3000)
    })
  })

  it('DELETE contact {ID}', function () {
    cy.request({
      method: 'DELETE',
      url: Cypress.env("endpointContacts") + this.contactID,
    }).then(response => {
      console.log(response)
      expect(response.status).to.equal(204)
      expect(response.body).to.equal('')
      expect(response.duration).to.be.lessThan(3000)
    })
  })

  it('Negative - Get contact List NOT FOUND', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env("endpointContacts") + "12",
      failOnStatusCode: false
    }).then(response => {
      console.log(response)
      expect(response.status).to.equal(404)
      expect(response.statusText).to.equal("Not Found")
      expect(response.duration).to.be.lessThan(3000)
    })
  })

  it('Negative - Missing First Name', () => {
    const newObject = contactData.postData
    newObject.firstName = ""
    cy.request({
      method: 'POST',
      url: Cypress.env("endpointContacts"),
      body: newObject,
      failOnStatusCode: false
    }).then(response => {
      console.log(response)
      expect(response.status).to.equal(400)
      expect(response.duration).to.be.lessThan(3000)
    })
  })

  it('Negative - Name Too Long', () => {
    const newObject = contactData.postData
    newObject.employer.company = "Google Google Google Google Google Google Google Google"
    cy.request({
      method: 'POST',
      url: Cypress.env("endpointContacts"),
      body: newObject,
      failOnStatusCode: false
    }).then(response => {
      console.log(response)
      expect(response.body.err).to.contain('is longer than the maximum allowed length (30).')
      expect(response.status).to.equal(400)
      expect(response.duration).to.be.lessThan(3000)
    })
  })

  it('Negative - Invalid Email', () => {
    const newObject2 = contactData.postData
    newObject2.lastName = "invalidemail;"
    cy.request({
      method: 'POST',
      url: Cypress.env("endpointContacts"),
      body: newObject2,
      failOnStatusCode: false
    }).then(response => {
      console.log(response)
      expect(response.status).to.equal(400)
      expect(response.duration).to.be.lessThan(3000)
      expect(response.body.err).to.contain('Validator failed for path `lastName` with value `invalidemail;')
    })
  })
})