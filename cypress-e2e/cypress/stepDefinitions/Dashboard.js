

import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import metadata from '../validations/dashboardpage.meta'
import DashboardPage from '../pom/Dashboardpage'
import CommonPage from '../pom/commonpage'
const commonPage = CommonPage
const dashboardPage = DashboardPage


Then('I should see the {string} page rendered with the correct url and the correct page header {string}', (page,header) => {
    cy.isUrlMatch(metadata.urls[page])
    dashboardPage.elements
    .dashboardHeader(header)
    .should('have.text',header)
    .and('have.css','color',metadata.css.dashboardpage.pageheader.color)
})

Then('I should see that all navlinks for {string} are present', (userType) => {
    commonPage.validateLinks(userType)
})



    
