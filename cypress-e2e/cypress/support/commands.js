Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.url().should('contain', '/dashboard')
    })
});

Cypress.Commands.add('silentlogin', () => {
    cy.request('POST','http://127.0.0.1:8000/api/v1/login-user',{
        email:Cypress.env('USERNAME'),
        password:Cypress.env('PASSWORD')
    })
    .then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body.status).to.eq(true)
        cy.window().then((win)=>{
            win.localStorage.setItem('token',response.body.token)
        })
    })
});

Cypress.Commands.add('deauthenticate', () => {
    cy.window().then((win)=>{
        win.localStorage.removeItem('token')
    })
});


Cypress.Commands.add('boltType',{ prevSubject: 'element' },
    (subject, text) => {
      cy.wrap(subject).type(text, { delay: 0 })
    }
)

Cypress.Commands.add('isUrlMatch', (url) => {
    cy.url().should('eq',`${Cypress.config('baseUrl')}${url}`)
});

