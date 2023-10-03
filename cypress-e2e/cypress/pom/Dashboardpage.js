class DashboardPage{

    elements = {
        dashboardHeader : (header) => cy.get('h3').contains(header),        
    }

    signIn(data){
        
    }
}

module.exports = new DashboardPage()