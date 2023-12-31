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
        addBookingBtn: (btnText) => cy.get('button').contains(btnText),
        roomsAndRatesLabel:() => cy.get('label').contains('Rooms and Rates'),
        pill:(pillText) => cy.get('div.pill').find('p').contains(pillText),
        checkBox:(checkBoxLabel) => cy.get('span').contains(checkBoxLabel).find('input')
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

    getRandomOption(nameArray) {
        console.log(nameArray)
        const randomIndex = Math.floor(Math.random() * nameArray.length);
        return nameArray[randomIndex];
    }

    selectDateTime(timeArr,numDaysArr,type,field){
        const now = new Date();
        now.setDate(now.getDate() + this.getRandomOption(numDaysArr));
        now.setHours(this.getRandomOption(timeArr), 0);

        // Format the date and time in the required format (YYYY-MM-DDTHH:mm).
        const formattedDateTime = now.toISOString().slice(0, 16);
        if(type=='silent'){
            this.elements[field]().clear().type(formattedDateTime)
        }
        else{}
        
    }
    
    selectAvailableRoomType() {
        let foundRooms = false;
    
        return new Cypress.Promise((resolve) => {
            this.elements.roomType().then((roomTypeEl) => {
                const roomTypes = Array.from(Cypress.$(roomTypeEl)[0].children);
    
                function selectAndCheck(index) {
                    if (index >= roomTypes.length || foundRooms) {
                        resolve();
                        return;
                    }
                    const roomTypeName = roomTypes[index].innerText;
                    cy.intercept(`http://127.0.0.1:8000/api/v1/hotel-room*`).as(`hotelRoomRequest${index}`);
                    this.elements.roomType().select(roomTypeName);
                    cy.wait(`@hotelRoomRequest${index}`,{timeout:15000}).its('response.statusCode').should('eq', 200);

                    if(roomTypeName != "Select Room Type"){
                        this.elements.rooms().then((roomsEl) => {
                            const rooms = Array.from(Cypress.$(roomsEl)[0].children);
                            if (rooms.length > 1) {
                                foundRooms = true;
                                Cypress.env('roomsLength',rooms.length)
                            }
                            // Recursively call the next iteration
                            selectAndCheck.call(this, index + 1);
                        });
                    }else{
                        selectAndCheck.call(this, index + 1);
                    }                    
                    
                }
                selectAndCheck.call(this, 0);
            });
        });
    }
    
    selectRooms(){

        if (Cypress.env('roomsLength') == 2){
            this.elements.rooms().select(1)
        }
        else if (Cypress.env('roomsLength') == 3){
            this.elements.rooms().select([1,2])
        }
        else if (Cypress.env('roomsLength') > 3){
            this.elements.rooms().select([1,2,3])
        }
    }

    checksPillsMatchSelectedRooms(addbookingsmetadata){
        this.elements.rooms().invoke('val').then((selected)=>{
            
            let rooms = []
            selected.forEach((room)=>{
                rooms.push(room.split(": '")[1].replaceAll("'",'').replaceAll('"',''))
            })
            this.elements.roomsAndRatesLabel().should('exist').and('be.visible')
            rooms.forEach((room)=>{
                this.elements.pill(`Room ${room}`).should('exist').and('be.visible')
                this.elements.pill(`Room ${room}`).parent().parent()
                .should('have.css','background-color',addbookingsmetadata.css.pill.background)
                .and('have.css','border-radius',addbookingsmetadata.css.pill.borderRadius)
                .and('have.css','color',addbookingsmetadata.css.pill.color)
            })
        })
    }

    extractMaxAndTypeOccupants(){
        this.elements.totalOccupants().then(($el)=>{
            const min = 2;
            const placeholderText = Cypress.$($el)[0].placeholder
            const maxOccupants = parseInt(placeholderText.split('selection is')[1])
            const randomNum = Math.floor(Math.random() * (maxOccupants - min + 1)) + min;
            cy.wrap($el).typeFast(randomNum)
        })
    }

    storeResponse(addbookingsmetadata){
        cy.get('@resp').then((serverResponse)=>{
            const responseBody = serverResponse.response.body
            expect(responseBody.status).to.eq(addbookingsmetadata.createdBookingResponse.status)
            expect(responseBody.message).to.eq(addbookingsmetadata.createdBookingResponse.message)
            expect(responseBody.reservation_token).to.include(addbookingsmetadata.createdBookingResponse.tokenPrefix)
            Cypress.env('lastReservationToken',responseBody.reservation_token)
            let partialPayload = {}
            const fields = addbookingsmetadata.createdBookingPayloadFields
            cy.wrap(fields).each((field)=>{
                this.elements[field]().then((el)=>{
                    partialPayload[field] = Cypress.$(el)[0].value
                })
            }).then(()=>{
                Cypress.env('lastReservationPayload',partialPayload)
                console.log("Booking payload ===> ", partialPayload)
            }) 
        })
    }

    makeBooking(addbookingsmetadata){
        console.log("Make booking ===> ", addbookingsmetadata)
        /* This method is for creating bookings on a single call without feature steps */
        const timeArr = addbookingsmetadata.addBookingData['arrival'].times
        const timeArrDeparture = addbookingsmetadata.addBookingData['departure'].times
        const numDaysArr = addbookingsmetadata.addBookingData['arrival'].numDaysFromToday
        const numDaysArrDeparture = addbookingsmetadata.addBookingData['departure'].numDaysFromToday
        let value = this.getRandomOption(addbookingsmetadata.addBookingData['firstname'])
        this.elements['firstname']().typeFast(value)
        value = this.getRandomOption(addbookingsmetadata.addBookingData['surname'])
        this.elements['surname']().typeFast(value)
        value = this.getRandomOption(addbookingsmetadata.addBookingData['gender'])
        this.elements['gender']().select(value)
        value = this.getRandomOption(addbookingsmetadata.addBookingData['phone'])
        this.elements['phone']().typeFast(value)
        value = this.getRandomOption(addbookingsmetadata.addBookingData['email'])
        this.elements['email']().typeFast(value)
        value = this.getRandomOption(addbookingsmetadata.addBookingData['address'])
        this.elements['address']().typeFast(value)
        value = this.getRandomOption(addbookingsmetadata.addBookingData['advance'])
        this.elements['advance']().typeFast(value)
        this.selectDateTime(timeArr,numDaysArr,Cypress.env('INTERACTION_MODE'),'arrival')
        this.selectDateTime(timeArrDeparture,numDaysArrDeparture,Cypress.env('INTERACTION_MODE'),'departure')
        this.selectAvailableRoomType().then(()=>{
            this.selectRooms()
            this.checksPillsMatchSelectedRooms(addbookingsmetadata)
            this.extractMaxAndTypeOccupants()
            value = this.getRandomOption(addbookingsmetadata.addBookingData['contactType'])
            this.elements['contactType']().select(value)
            this.elements['contact']().select(1)
            value = this.getRandomOption(addbookingsmetadata.addBookingData['rate'])
            this.elements['rate']().select(value)
            value = this.getRandomOption(addbookingsmetadata.addBookingData['package'])
            this.elements['package']().select(value)
            cy.intercept(`http://127.0.0.1:8000/api/v1/reservation*`).as('makeReservation');
            this.elements.addBookingBtn('Add Booking').click();
            cy.wait('@makeReservation',{timeout:60000}).as('resp').its('response.statusCode').should('eq', 201)
            this.storeResponse(addbookingsmetadata)
        })
        
    }
}

module.exports = new AddBooking()
