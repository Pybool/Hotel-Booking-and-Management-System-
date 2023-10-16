

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
    "arrivedDate": {
        "Type": "datetime-local",
        "Label": "Arrival",
        "InitialState": "Enabled"
    },
    "departDate": {
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

export default fields