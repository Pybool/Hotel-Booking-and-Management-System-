
import {Given, When, Then, And} from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pom/Loginpage'
import metadata from '../validations/loginpage.meta'

const loginPage = LoginPage

Given('I am a logged in user on the Roxandrea Staff Module', () => {
    cy.silentlogin()
})

Given('I am a logged in user on the Roxandrea Staff Module as an Administrator', () => {
    cy.silentlogin(isAdmin=true)
})

Given('I am not logged in on the Roxandrea Staff Module', () => {
    cy.deauthenticate()
})
    
When('I navigate to the {string} page on the Roxandrea Staff Module', (page) => {
    cy.visit(`/${metadata.urls[page]}`)
})

Then('I should be redirected to the {string} page when not logged in', (page) => {
    cy.isUrlMatch(metadata.urls[page.toLowerCase()])
    loginPage.elements
    .loginHeader(page)
    .should('have.css','color',metadata.css.loginpage.pageheader.color)
})


