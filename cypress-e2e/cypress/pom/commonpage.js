import commonMetaData from '../validations/common.meta';

class Commonpage {

  elements = {
    navsection: () => cy.get('ul.nk-menu'),
    navBar:() => cy.get('[data-content="sidebarMenu"]'),
    navHamburger:() => cy.get('.nk-nav-compact'),
    searchBar:() => cy.get('#search-bar'),
    exportBtn:() => cy.get('a.btn').contains('Export')
  };

  validateLinks(role) {
    this.role = role;
    const links = this.getLinksByRole();

    this.elements.navsection()
    .should('exist')
    .and('be.visible')
    .children()
    .should('have.length', Object.keys(links).length + 3);
    
    cy.ensureScripts()
    cy.waitStabilizedDom(1)

    cy.wrap(Object.values(links)).each((link) => {
      const linkElement = this.elements.navsection().get('li.nk-menu-item > a').contains(link.name);
      linkElement.should('have.text', link.name);

      if (link.hasSublinks) {
        linkElement
          .parent()
          .should('exist')
          .and('be.visible')
          .click();

        linkElement
          .parent()
          .siblings()
          .last()
          .scrollIntoView()
          .should('be.visible');

        link.sublinks.forEach((sublink) => {
          cy.get('li.nk-menu-item > a > span')
            .contains(sublink)
            .scrollIntoView()
            .should('exist')
            .and('be.visible')
            .and('have.text', sublink);
        });
      }
    });
  }

  getLinksByRole() {
    if (this.role === 'administrator') {
      return commonMetaData.navlinks;
    }
    return {};
  }
}

module.exports = new Commonpage()