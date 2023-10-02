Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.url().should('contain', '/dashboard')
    })
});

Cypress.Commands.add('boltType',{ prevSubject: 'element' },
    (subject, text) => {
      cy.wrap(subject).type(text, { delay: 0 })
    }
)