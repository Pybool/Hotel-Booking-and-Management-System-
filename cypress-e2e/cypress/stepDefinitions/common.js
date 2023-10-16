
import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pom/Loginpage'
import Commonpage from '../pom/commonpage'
import DashboardPage from '../pom/dashboardpage'
import BookingsCommon from '../pom/bookingspage'
import commonMetaData   from '../validations/common.meta'
import loginMetaData    from '../validations/loginpage.meta'

const loginPage = LoginPage
const commonPage = Commonpage
const dashboardPage = DashboardPage
const bookingsCommon = BookingsCommon

models = {dashboardPage:dashboardPage,bookingsCommon:bookingsCommon}


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
    models = {dashboardPage:dashboardPage,bookingsCommon:bookingsCommon}
    commonPage.validatePageAndUrl(page,header,models)
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

Then('I should see a {string} and {string} and an {string} Button right of the {string} header', (searchbar,exportBtn,addBtn,header) => {
    bookingsCommon.validateHeaderElements(header,commonPage)
})

Then('I should see a Bookings Table on the page', () => {
    bookingsCommon.elements.bookingsTable().should('exist').and('be.visible')
})

Then('I should see a spinner while table loads', () => {
    bookingsCommon.elements.tableSpinner().should('exist').and('be.visible')
})

Then('All headers must be correctly displayed in the Table:', (dataTable) => {
    bookingsCommon.validateTableHeaders(dataTable)
})

Then('I should see a select dropdown an Apply button and a Search Icon button above just above the table', () => {
    bookingsCommon.validateTableBulkActionElements()
    bookingsCommon.elements.tableSearchIcon().should('exist').and('be.visible')
})

When('I click the Bulk Action dropdown', () => {
    bookingsCommon.elements.bulkActionSelect().select(1,{force:true})
})

Then('I should see options {string} {string} and {string}', (bulkApply,checkIn,cancelBookings) => {
    const data = {bulkApply:bulkApply,checkIn:checkIn,cancelBookings:cancelBookings}
    bookingsCommon.validateBulkActionsDropdownOptions(data)
})

When('I click the table search icon', () => {
    bookingsCommon.elements.tableSearchIcon().click()
})

Then('I should no longer see the select dropdown and Apply button', () => {
    bookingsCommon.validateTableBulkActionElements(-1)
})

Then('The Total bookings count header should correctly reflect the total amount of rows in the table', () => {
    bookingsCommon.validateCountHeaderWithRows()
})

Then('I ensure all rows in the table have a ROX-ID with length {string}', (len) => {
    bookingsCommon.ensureAllRowsHaveRoxIDAndLen(parseInt(len))
})

Then('I verify that in the navigation bar the {string} sub menu is active',(link)=>{
    cy.get('li.nk-menu-item > a.nk-menu-link > span')
    .contains(link).as('submenu')
    .should('be.visible')
    .and('have.text', link)

    cy.get('@submenu')
    .parent()
    .parent()
    .should('have.class', 'active')
})














