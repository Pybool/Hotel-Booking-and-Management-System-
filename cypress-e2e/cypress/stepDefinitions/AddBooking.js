
import {When, Then} from '@badeball/cypress-cucumber-preprocessor';
import addbookingsmetadata from '../validations/addbookings.meta'
import AddBooking from '../pom/addbookingpage'
import BookingsCommon from '../pom/bookingspage'
const addBooking = AddBooking
const bookingsCommon = BookingsCommon

Then('I ensure that all the needed input fields are present', () => {
    const fields = addbookingsmetadata.addBookingFields
    cy.wrap(Object.keys(fields)).each((el)=>{
        addBooking.validateFields(addBooking.elements[`${el}`](),fields[el])
    })
})

Then('I confirm that there is an {string} button at the bottom of the page', (btnText) => {
    addBooking.elements.addBookingBtn(btnText).scrollIntoView().should('exist').and('be.visible')
})

Then('I check that the {string} button has the correct css properties', (btnText) => {
    addBooking.elements.addBookingBtn(btnText)
    .should('have.css','background-color',addbookingsmetadata.css.addBookingsButton.background)
    .and('have.css','color',addbookingsmetadata.css.addBookingsButton.color)
})

Then('I type in an invalid characters in {string} field', (field) => {
    addBooking.elements[field]().typeFast("182939@invalid")
})

Then('I should see a validation text below the {string} field with {string} text', (field,errortype) => {
    let txt;
    if(errortype=='invalid'){txt=addbookingsmetadata.validationTexts[field].invalid}
    else{txt=addbookingsmetadata.validationTexts[field].required}
    addBooking.elements.errorTile(field).should('have.text',txt)
})

When('I clear the {string} field', (field) => {
    addBooking.elements[field]().clear()
})

When('I select an invalid {string} in the form', (field) => {
    addBooking.elements[field]().select(0)
})

Then('I type in a {string} in the {string} input field', (value,field) => {
    value = addBooking.getRandomOption(addbookingsmetadata.addBookingData[field])
    addBooking.elements[field]().typeFast(value)
})

Then('I select a {string} in the correct field', (field) => {
    value = addBooking.getRandomOption(addbookingsmetadata.addBookingData[field])
    addBooking.elements[field]().select(value)
})

Then('I select an {string} date', (field) => {
    const timeArr = addbookingsmetadata.addBookingData[field].times
    const numDaysArr = addbookingsmetadata.addBookingData[field].numDaysFromToday
    addBooking.selectDateTime(timeArr,numDaysArr,Cypress.env('INTERACTION_MODE'),field)
})

Then('I select a room type', () => {
    addBooking.selectAvailableRoomType()
})

Then('I select rooms for the reservation', () => {
    addBooking.selectRooms()
})

Then('I should see pills below the page matching the rooms selected with the correct css properties', () => {
    addBooking.checksPillsMatchSelectedRooms(addbookingsmetadata)
})

Then('I type in the number of occupants', () => {
    addBooking.extractMaxAndTypeOccupants()
})

Then('I select a {string} in the dropdown', (field) => {
    const value = addBooking.getRandomOption(addbookingsmetadata.addBookingData[field])
    addBooking.elements[field]().select(value)
})

Then('I select a {string} mail in the dropdown', (field) => {
    addBooking.elements[field]().select(1)
})

Then('I select a {string} in the {string} dropdown', (field) => {
    const value = addBooking.getRandomOption(addbookingsmetadata.addBookingData[field])
    addBooking.elements[field]().select(value)
})

When('I click the {string} button', (btnText) => {
    cy.intercept(`http://127.0.0.1:8000/api/v1/reservation*`).as('makeReservation');
    addBooking.elements.addBookingBtn(btnText).click();
})

Then('The booking should be sucessfully created and displays an alert on the page', () => {
    cy.wait('@makeReservation',{timeout:60000}).as('resp').its('response.statusCode').should('eq', 201)
    addBooking.storeResponse(addbookingsmetadata)
})

Then('I should see that the a reservation with reservation token of the last created order exists', () => {
    bookingsCommon.checkLastCreatedOrderExists()
})

Then('I should see that the other details in the table match the last created order', () => {
    bookingsCommon.checkLastCreatedOrderMatches()
})

Then('I check the {string} checkbox', (checkBoxLabel) => {
    addBooking.elements.checkBox(checkBoxLabel).check()
})







after(() => {
    if(Cypress.env('clearReservationsPerTest')){
       return  cy.request({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/v1/reset-reservations',
          }).then((response) => {
            console.log(response)
        });
    }
    cy.log("Reservations reset per test is not enabled")
  });




























