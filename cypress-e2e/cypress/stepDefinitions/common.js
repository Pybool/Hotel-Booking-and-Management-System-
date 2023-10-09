
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
    cy.isUrlMatch(commonMetaData.urls[page.toLowerCase().replaceAll(' ','_')])
    let selectedPage;
    if(page=='dashboard'){
        selectedPage = dashboardPage;
    }
    else if (page == 'Pending Bookings'){
        selectedPage = bookingsCommon
    }

    Cypress.env('selectedPage',selectedPage)

    selectedPage.elements
    .pageHeader(header)
    .should('have.text',header)
    .and('have.css','color',commonMetaData.css[`${page}`].pageheader.color)
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

Then('All headers must be correctly displayed in the Table:', (dataTable) => {
    bookingsCommon.elements.tableHeaders().then((headers)=>{
        let counter = 0;
        let headersArray = new Array()
        
        cy.wrap(headers).each((header)=>{
            headersArray.push(Cypress.$(header)[0].textContent)
        }).then(()=>{
            cy.wrap(dataTable.hashes()).each((dataItem)=>{
                expect(dataItem.Headers).to.eq(headersArray[counter])
                counter++
            })
        })
        
    })
    
})










