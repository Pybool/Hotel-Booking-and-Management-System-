
import {When, Then} from '@badeball/cypress-cucumber-preprocessor';
    
When('I navigate to the {string} page on the Roxandrea Admin Module', (page) => {
    cy.visit(`/${page}`)
})

Then('I should see the {string} page rendered with the correct url and the page header {string} with color {string}', (page,header,color) => {
    cy.url().should('eq',`${Cypress.config('baseUrl')}${page}`)
    cy.get('h4').contains(header).should('have.css','color',color)
})

Then('I should see a label {string}', (label) => {
    cy.get('form').find('label')
    .contains(label)
    .should('exist')
    .and('be.visible')
})

Then('I should see the {string} input field', (field) => {
    cy.get(`#${field}`)
    .should('exist')
    .and('be.visible')
})

Then('I should see a {string} link with color {string}', (linkText,color) => {
    cy.get(`a`)
    .contains(linkText).as('forgotPwd')
    .should('exist')
    .and('be.visible')
    
    cy.get('@forgotPwd')
    .should('have.css','color',color)
})

Then('I should see a {string} Button with background color {string} and color {string}', (btnText,bgColor,color) => {
    cy.get(`button`)
    .contains(btnText).as('loginButton')
    .should('exist')
    .and('be.visible')

    cy.get('@loginButton')
    .should('have.css','background-color',bgColor)
    .and('have.css','color',color)
})

Then('I type in my {string} in the input field', (credential) => {
    cy.get(`#${field}`)
    .boltType(Cypress.env(credential))
})









