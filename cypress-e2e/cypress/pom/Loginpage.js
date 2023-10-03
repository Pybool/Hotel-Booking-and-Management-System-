class LoginPage{

    elements = {
        loginHeader : (header) => cy.get('h4').contains(header),
        InputLabel : (label) => cy.get('form').find('label').contains(label),
        loginCredential : (field) => cy.get(`#${field}`),
        loginButton: (btnText) => cy.get(`button`).contains(btnText).as('loginButton'),
        forgotPassword: (linkText) => cy.get(`a`).contains(linkText).as('forgotPwd')
    }

    signIn(data){
        this.elements.loginCredential('email').typeFast(data.email)
        this.elements.loginCredential('password').typeFast(data.password)
        this.elements.loginButton(data.button).click()
    }
}


module.exports = new LoginPage()