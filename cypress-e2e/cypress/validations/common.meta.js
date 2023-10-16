
const commonMetaData = {
    urls:{
        login:'login',
        register:'register',
        dashboard:'root/frontdesk/dashboard',
        pending_bookings:'root/frontdesk/upcoming-checkins',
        active_bookings: 'root/frontdesk/active-checkins',
        'checked-in_bookings': 'root/frontdesk/active-checkins',
        'add_booking':'root/frontdesk/reservation'
    },
    css:{
        loginpage:{
            pageheader:{
                color:'rgb(225, 31, 64)',
            },
            forgotpassword:{
                color:'rgb(225, 31, 64)',
            },
            loginbutton:{
                color:'rgb(255, 255, 255)',
                bgcolor:'rgb(225, 31, 64)'
            }

        },
        dashboard:{
            pageheader:{
                color:'rgb(255, 255, 255)',
            },

        },
        'Pending Bookings':{
            pageheader:{
                color:'rgb(255, 255, 255)',
            },

        },
        'Checked-In Bookings':{
            pageheader:{
                color:'rgb(255, 255, 255)',
            },

        },
        'Add Booking':{
            pageheader:{
                color:'rgb(255, 255, 255)',
            },

        },
    },

    roles : {   
                admin:['*'],
                frontdesk:{
                    navlinks:{
                        dashboard:{
                            main:'Dashboard',
                            subs:[]
                        },
                        frontdesk:{
                            main:'Bookings',
                            subs:['Pending Bookings','Checked-In Bookings','Add Booking']
                        },


                    }
                }
            },

    navlinks:{
        dashboard: {name:'Dashboard',hasSublinks:false},
        bookings:  {name:'Bookings',hasSublinks:true,sublinks:['Pending Bookings','Checked-In Bookings','Add Booking']},
        room:      {name:'Room',hasSublinks:true,sublinks:['All Rooms','Room Types']},
        reports:   {name:'Reports',hasSublinks:true,sublinks:['Stocks','Expenses']},
        customers: {name:'Customers',hasSublinks:false},
        payments:  {name:'Payment',hasSublinks:true,sublinks:['Create Invoice','Invoice List']},
        services:  {name:'Services',hasSublinks:false},
        request_handling: {name:'Requests Handling',hasSublinks:true,sublinks:['Raised Complaints']},
        support:   {name:'Support',hasSublinks:false},
        settings:  {name:'Settings',hasSublinks:false},
        bootstraps: {name:'Bootstraps',hasSublinks:true,
                        sublinks:[
                            'Create Staff',
                            'Staff List',
                            'Departments',
                            'Floors',
                            'New Floor',
                            'New Department',
                            'Services',
                            'Addons Configurations',
                            'Client UI Config'
                        ]
                    },
    }
}

export default commonMetaData