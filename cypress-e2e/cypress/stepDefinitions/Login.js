
import {When, Then} from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pom/Loginpage'
import loginMetadata from '../validations/loginpage.meta'
const loginPage = LoginPage

Then('I should see the {string} page rendered with the correct url and the page header {string} with color {string}', (page,header) => {
    cy.isUrlMatch(loginMetadata.urls[page])
    loginPage.elements
    .loginHeader(header)
    .should('have.css','color',loginMetadata.css.loginpage.pageheader.color)
})

Then('I should see a label {string}', (label) => {
    loginPage.elements
    .InputLabel(label)
    .should('exist')
    .and('be.visible')
})

Then('I should see the {string} input field', (field) => {
    loginPage.elements
    .loginCredential(field)
    .should('exist')
    .and('be.visible')
})

Then('I should see a {string} link with color {string}', (linkText) => {
    loginPage.elements
    .forgotPassword(linkText)
    .should('exist')
    .and('be.visible')
    cy.get('@forgotPwd')
    .should('have.css','color',loginMetadata.css.loginpage.forgotpassword.color)
})

Then('I should see a {string} Button with background color {string} and color {string}', (btnText) => {
    loginPage.elements
    .loginButton(btnText)
    .should('exist')
    .and('be.visible')

    loginPage.elements
    .loginButton(btnText)
    .should('have.css','background-color',loginMetadata.css.loginpage.loginbutton.bgcolor)
    .and('have.css','color',loginMetadata.css.loginpage.loginbutton.color)
})

Then('I enter my credentials and sign in', () => {
    const data = {email:Cypress.env('ADMIN_USERNAME'),password:Cypress.env('ADMIN_PASSWORD'),button:'Login'}
    loginPage.signIn(data)
})

Then('I enter my wrong credentials and sign in', () => {
    const data = {email:Cypress.env('WRONG_USERNAME'),password:Cypress.env('ADMIN_PASSWORD'),button:'Login'}
    loginPage.signIn(data)
})

Then('I should be redirected to the {string} page', (page) => {
    cy.isUrlMatch(loginMetadata.urls[page])
})













