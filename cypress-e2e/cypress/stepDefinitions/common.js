
import {Given, When, Then, And} from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pom/Loginpage'
import Commonpage from '../pom/commonpage'
import DashboardPage from '../pom/Dashboardpage'
import { commonMetaData }   from '../validations/common.meta'
import { loginMetaData }   from '../validations/loginpage.meta'
// import metadata from '../validations/dashboardpage.meta'


const loginPage = LoginPage
const commonPage = Commonpage
const dashboardPage = DashboardPage

Given('I am a logged in user on the Roxandrea Staff Module', () => {
    cy.silentlogin()
})

Given('I am a logged in user on the Roxandrea Staff Module as an Administrator', () => {
    cy.silentlogin(true)
})

Given('I am not logged in on the Roxandrea Staff Module', () => {
    cy.deauthenticate()
})
    
When('I navigate to the {string} page on the Roxandrea Staff Module', (page) => {
    cy.visit(`/${commonMetaData.urls[page.toLowerCase().replaceAll(' ','_')]}`)
})

Then('I should be redirected to the {string} page when not logged in', (page) => {
    cy.isUrlMatch(commonMetaData.urls[page.toLowerCase()])
    loginPage.elements
    .loginHeader(page)
    .should('have.css','color',loginMetaData.css.loginpage.pageheader.color)
})

Then('I should see the {string} page rendered with the correct url and the correct page header {string}', (page,header) => {
    cy.isUrlMatch(commonMetaData.urls[page])
    dashboardPage.elements
    .dashboardHeader(header)
    .should('have.text',header)
    .and('have.css','color',loginMetaData.css.dashboardpage.pageheader.color)
})


When('I click the harburger icon on the top of the navbar to collapse the navbar', () => {
    commonPage.elements.navHamburger().click({force:true})
})


Then('I should see that the navbar is collapsed', () => {
    commonPage.elements.navBar().should('have.class','is-compact')
})

Then('I should see that the navbar is expanded', () => {
    commonPage.elements.navBar().should('not.have.class','is-compact')
})




