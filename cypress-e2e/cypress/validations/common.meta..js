export default metadata = {

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
        reports:   {name:'Room',hasSublinks:true,sublinks:['Stocks','Expenses']},
        customers: {name:'Customers',hasSublinks:false},
        payments:  {name:'Payments',hasSublinks:true,sublinks:['Create Invoice','Invoice List']},
        services:  {name:'Services',hasSublinks:false},
        request_handling: {name:'Request Handling',hasSublinks:true,sublinks:['Raised Complaints']},
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