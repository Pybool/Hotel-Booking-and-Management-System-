Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.url().should('contain', '/dashboard')
    })
});

Cypress.Commands.add('silentlogin', (isAdmin=false) => {
    const data = {
        email: isAdmin ? Cypress.env('USERNAME') : Cypress.env('ADMIN_USERNAME'),
        password: isAdmin ? Cypress.env('PASSWORD') : Cypress.env('ADMIN_PASSWORD'),
    };

    console.log(isAdmin,data)
      
    cy.request('POST','http://127.0.0.1:8000/api/v1/login-user',data)
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

Cypress.Commands.add('waitStabilizedDom', (ms) => {
    cy.wait(ms*1000)
});


Cypress.Commands.add('ensureScripts', () => {
    // Assuming you have loaded your webpage and want to select a div with a specific selector
    cy.get('div.nk-app-root').should('exist').within(() => {
        cy.get('script[src="http://localhost:4200/assets/js/bundlee5ca.js?ver=3.2.3"]').should('exist');
        cy.get('script[src="http://localhost:4200/assets/js/charts/chart-hotele5ca.js?ver=3.2.3"]').should('exist');
    });
});





Cypress.Commands.add('typeFast',{ prevSubject: 'element' },
    (subject, text) => {
      cy.wrap(subject).type(text, { delay: 0 })
    }
)

Cypress.Commands.add('isUrlMatch', (url) => {
    cy.url().should('eq',`${Cypress.config('baseUrl')}${url}`)
});

