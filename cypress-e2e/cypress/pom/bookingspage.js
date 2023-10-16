import configurations from '../validations/addbookings.meta'
class BookingsCommon{

    elements = {
        pageHeader : (header) => cy.get('h3').contains(header),
        bookingsTable: () => cy.get('div.nk-tb-list'),
        tableHeaders: () => cy.get('div.nk-tb-head').find('div > span'),
        bulkActionSelect: () => cy.get('[data-placeholder="Bulk Action"]'),
        applyBulkAction: (btnTxt) => cy.get('button').contains(btnTxt),
        tableSearchIcon : () => cy.get('em.ni-search').eq(0),
        tableSpinner : () => cy.get('div.spinner'),
        countHeader:() =>  this.elements.pageHeader(Cypress.env('header')).siblings().last().children().last(),
        tableRows:() => cy.get('div.nk-tb-item')
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
        let counter = 0;
        let headersArray = new Array()
        this.elements.tableHeaders().then((headers)=>{
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

    validateTableBulkActionElements(visible=1){
        let isvisible = 'be.visible'
        let isExist = 'exist'
        if (visible== -1) isvisible = 'not.be.visible';
        if (visible== -1) isExist = 'not.exist';
        this.elements.bulkActionSelect().should(isExist).then((el)=>{
            if(visible == 1){
                cy.wrap(el).should(isvisible)
            }
        })
        this.elements.applyBulkAction('Apply').should(isExist).then((el)=>{
            if(visible == 1){
                cy.wrap(el).should(isvisible)
            }
        })
    }

    validateBulkActionsDropdownOptions(data){
        let optlst = new Array()
        this.elements.bulkActionSelect().select(1,{force:true}).then((select)=>{
            cy.wrap(Cypress.$(select)[0].children).each((child)=>{
                child = Cypress.$(child)[0]
                if(child.textContent == 'Bulk Action'){
                    cy.wrap(Cypress.$(child)).should('have.attr','disabled')
                }
                optlst.push(child.textContent)
            })
            .then(()=>{
                [data.bulkApply,data.checkIn,data.cancelBookings].forEach((txt)=>{
                    expect(optlst.includes(txt)).to.eq(true);
                })
            })
        })
    }

    validateCountHeaderWithRows(){
        this.elements.tableRows().its('length').then((length)=>{
            const rowsCount = length - 1  /* Remove 1 from the length to account for the header which also has the nk-tb-item class */
            this.elements.countHeader().invoke('text').then((txt)=>{
                if(length > 1 && rowsCount < configurations.paginationLimit) expect(txt).to.eq(`You have total ${rowsCount} booking\'s.`)
                if(length == 1) expect(txt).to.eq(`You have no bookings.`)
            })
        })
    }

    ensureAllRowsHaveRoxIDAndLen(len){
        this.elements.tableRows().then((rows)=>{
            Array.from(Cypress.$(rows)).forEach((row)=>{
                console.log(Array.from(row.classList))
               if(!Array.from(row.classList).includes('nk-tb-head')){
                 const roxID = row.children[2].children[0].textContent
                 expect(roxID).to.include('ROX-')
                 expect(roxID).to.have.length('ROX-'.length + len)
               }
            })
        })
    }

    createBooking(){

    }

    checkAvailability(){
        
    }

}

module.exports = new BookingsCommon()