import metadata from '../validations/common.meta';

class Commonpage {
  elements = {
    navsection: () => cy.get('ul.nk-menu'),
  };

  validateLinks(role) {
    this.role = role;
    const links = this.getLinksByRole();

    this.elements.navsection()
      .should('exist')
      .and('be.visible')
      .children()
      .should('have.length', Object.keys(links).length + 3);

    cy.wait(1000);

    Object.values(links).forEach((link) => {
      const linkElement = this.elements.navsection().get('li.nk-menu-item > a').contains(link.name);

      linkElement.should('have.text', link.name);

      if (link.hasSublinks) {
        linkElement
          .parent()
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
      return metadata.navlinks;
    }
    // You can add more roles here with their respective links if needed.
    return {};
  }
}

module.exports = new Commonpage()