

// import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
// import fields from '../validations/addbookings.meta'
// import AddBooking from '../pom/addbookingpage'
// const addBooking = AddBooking
// console.log("Add Booking ", addBooking)

// Then('I ensure that all the needed input fields are present', () => {
//     console.log("AddBookings Fields ===> ", fields)
//     addBooking.validateFields(addBooking.elements.firstname(),fields.firstname)


// })



import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import fields from '../validations/addbookings.meta'
import AddBooking from '../pom/addbookingpage'
const addBooking = AddBooking
console.log("Add Booking ", addBooking)

Then('I ensure that all the needed input fields are present', () => {
    console.log("AddBookings Fields ===> ", fields)
    cy.wrap(Object.keys(fields)).each((el)=>{
        console.log("El ", addBooking.elements[`${el}`])
        addBooking.validateFields(addBooking.elements[`${el}`](),fields[el])
    })
})







