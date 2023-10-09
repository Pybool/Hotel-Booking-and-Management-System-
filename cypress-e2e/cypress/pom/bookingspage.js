class BookingsCommon{

    elements = {
        pageHeader : (header) => cy.get('h3').contains(header),
        bookingsTable: () => cy.get('div.nk-tb-list'),
        tableHeaders: () => cy.get('div.nk-tb-head').find('div > span')
    }

    validateHeaderElements(header,pageObject){
        Cypress.env('selectedPage').elements
        .pageHeader(header).parent().siblings().last().find('ul > li > input').then((searchBar)=>{
            pageObject.elements.searchBar().then((chainerEl)=>{
                expect(Cypress.$(searchBar)[0].id).to.eq(Cypress.$(chainerEl)[0].id)
                expect(Cypress.$(searchBar)[0].placeholder).to.eq(Cypress.$(chainerEl)[0].placeholder)
            })

            cy.wrap(Cypress.$(searchBar)).parent().siblings().eq(0).then((exportButton)=>{
                pageObject.elements.exportBtn().then((chainerEl)=>{
                    expect(Cypress.$(exportButton)[0].innerText).to.eq(Cypress.$(chainerEl)[0].innerText)
                })
            })

            cy.wrap(Cypress.$(searchBar)).parent().siblings().last().find('em').then((plusButton)=>{
                cy.wrap(plusButton).should('have.class','icon ni ni-plus')
            })

            pageObject.elements.searchBar().should('exist').and('be.visible')
            pageObject.elements.exportBtn().should('exist').and('be.visible')
            
        })
    }

    validateTableHeaders(dataTable){
        this.elements.tableHeaders().then((headers)=>{
            let counter = 0;
            let headersArray = new Array()
            
            cy.wrap(headers).each((header)=>{
                headersArray.push(Cypress.$(header)[0].textContent)
            }).then(()=>{
                cy.wrap(dataTable.hashes()).each((dataItem)=>{
                    expect(dataItem.Headers).to.eq(headersArray[counter])
                    counter++
                })
            })
            
        })
    }
}

class PendingBookings{

}


module.exports = new BookingsCommon()