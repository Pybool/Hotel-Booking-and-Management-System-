import configurations from '../../settings.js'


class AddBooking{

    elements = {
        firstname: () => cy.get('input#first-name'),
        surname: () => cy.get('input#last-name'),
        gender: () => cy.get('select[name="gender"]'), 
        phone: () => cy.get('input[name="phone"]'),  
        email: () => cy.get('input[name="email"]'),
        address: () => cy.get('input#address1'),
        advance: () => cy.get('input[name="advance_amount"]'),
        arrival: () => cy.get('input[name="check_in"]'),
        departure: () => cy.get('input[name="check_out"]'),
        roomType: () => cy.get('select[name="room_type"]'),  
        rooms: () => cy.get('select[name="rooms"]'),        
        totalOccupants: () => cy.get('input[name="no_occupants"]'),
        contactType: () => cy.get('select[name="contact_type"]'),
        contact: () => cy.get('select[name="contact"]'),
        rate: () => cy.get('select[name="room_rate"]'),
        package: () => cy.get('select[name="package"]'),
        errorTile: (field) => cy.get(`div.error-${field}`),
        addBookingBtn: (btnText) => cy.get('button').contains(btnText)
    }
    

    validateFields(element,meta){
        element.as('currentInput')

        cy.get("@currentInput").scrollIntoView().should('exist').and('be.visible')

        if(meta.InitialState == "Enabled"){
            element.should('not.have.attr','disabled')
        }
        else if (meta.InitialState.includes("Disabled")){
            element.should('have.attr','disabled')
            if(meta.InitialState.includes('Empty')){
                cy.get("@currentInput").should('have.descendants', 'option').should('have.length',1)
            }
        }
        /* validateInputFieldTypes in configurations must be set to true to run the snippet below */
        if(configurations.validateInputFieldTypes){
            cy.get("@currentInput").then((el)=>{
                if(Cypress.$(el)[0].tagName === 'INPUT'){
                    console.log(meta)
                    cy.wrap(el).should('have.attr','type',meta.Type.split("--")[0])
                }
                cy.wrap(el).parent().parent().find('label').eq(0).then((label)=>{
                    expect(Cypress.$(label)[0].tagName).to.eq('LABEL')
                }).should('have.text',meta.Label)
            })
        }
    }

    makeBooking(){}
}

module.exports = new AddBooking()