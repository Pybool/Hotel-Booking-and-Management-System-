

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
        "InitialState": "Disabled"
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
        "InitialState": "Disabled"
    },
    "package": {
        "Type": "select-single",
        "Label": "Select a package",
        "InitialState": "Disabled"
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
    }
}

export default addbookingsmetadata