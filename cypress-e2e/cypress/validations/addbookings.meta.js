

 const fields = {
    "firstname": {
        "Type": "text--field",
        "Label": "First Name",
        "InitialState": "Enabled"
    },
    "surname": {
        "Type": "text--field",
        "Label": "Last Name",
        "InitialState": "Enabled"
    },
    "gender": {
        "Type": "select-single",
        "Label": "Gender",
        "InitialState": "Enabled"
    },
    "phone": {
        "Type": "telephone--field",
        "Label": "Phone",
        "InitialState": "Enabled"
    },
    "email": {
        "Type": "email--field",
        "Label": "Email Address",
        "InitialState": "Enabled"
    },
    "address": {
        "Type": "text--field",
        "Label": "Address",
        "InitialState": "Enabled"
    },
    "advance": {
        "Type": "number--field",
        "Label": "Advance Paid",
        "InitialState": "Enabled"
    },
    "arrival": {
        "Type": "datetime-local",
        "Label": "Arrival",
        "InitialState": "Enabled"
    },
    "departure": {
        "Type": "datetime-local",
        "Label": "Departure",
        "InitialState": "Enabled"
    },
    "roomType": {
        "Type": "select-single",
        "Label": "Select Room Type",
        "InitialState": "Enabled"
    },
    "rooms": {
        "Type": "select-multiple",
        "Label": "Select Rooms",
        "InitialState": "Disabled && Empty"
    },
    "totalOccupants": {
        "Type": "number--field",
        "Label": "Total Occupants",
        "InitialState": "Enabled"
    },
    "contactType": {
        "Type": "select-single",
        "Label": "Select Contact Type",
        "InitialState": "Enabled"
    },
    "contact": {
        "Type": "select-single",
        "Label": "Select Contact",
        "InitialState": "Disabled"
    },
    "rate": {
        "Type": "select-single",
        "Label": "Choose a rate to apply",
        "InitialState": "Enabled"
    },
    "package": {
        "Type": "select-single",
        "Label": "Select a package",
        "InitialState": "Enabled"
    }
}

const addbookingsmetadata = {
    urls:{
        add_bookings:'root/frontdesk/reservation'
    },

    css:{
        addBookingsButton:{
            background:'rgb(101, 118, 255)',
            color:'rgb(255, 255, 255)'
        },
        pill:{
            background: 'rgb(236, 166, 177)',
            borderRadius: '40px',
            color:'rgb(255, 255, 255)'
        }
    },

    addBookingFields:fields,

    validationTexts:{
        firstname: {
                    invalid:"Firstname must not contain special characters or numbers",
                    required:"Firstname is required to proceed"
                    },

        surname:    {
                    invalid:"Surname must not contain special characters or numbers",
                    required:"Surname is required to proceed"
                    },

        gender:     {invalid:"You must select a valid gender option"},

        phone:      {invalid:"Phone Number must not contain special characters or characters",
                    required:"Phone number is required to proceed"
                    },

        email:      {
                    invalid:'Email address supplied is invalid',
                    required:'Email address is required to proceed'
                    }
    },

    addBookingData:{
                    firstname: ["John", "Alice", "Michael", "Emily", "David", "Sophia", "William", "Olivia", "James", "Emma"],
                    surname: ["Smith", "Johnson", "Brown", "Davis", "Lee", "Martinez", "Taylor", "Wilson", "Harris", "Anderson"],
                    gender: ["Male", "Female"],
                    phone: ["1234567890", "5551234567", "9876543210", "5555555555", "8888888888", "1112223333"],
                    email: ["john@example.com", "alice@email.com", "michael@domain.com", "user123@gmail.com", "test@example.org", "yourname@hotmail.com"],
                    address: ["123 Main St, City, Country", "456 Elm Rd, Town, Nation", "789 Oak Ave, Village, State", "567 Pine Ln, County, Region", "987 Maple Dr, Suburb, Territory", "111 Cedar Blvd, Hamlet, Province"],
                    advance: ["1000", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000"],
                    arrival:{times:[19,20,21,22,23],numDaysFromToday:[2,3,4]},
                    departure:{times:[19,20,21,22,23],numDaysFromToday:[7,8,9]},
                    contactType:['Individual','Corporate'],
                    rate:['Generic'],
                    package:['Honeymoon Package','Spring Package','Starter Package','Vacation Package']

                }
      
}

export default addbookingsmetadata