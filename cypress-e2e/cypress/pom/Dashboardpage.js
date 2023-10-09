class DashboardPage{

    elements = {
        pageHeader : (header) => cy.get('h3').contains(header),        
    }

    signIn(data){
        
    }
}

module.exports = new DashboardPage()