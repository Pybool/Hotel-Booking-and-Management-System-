
import './commands'

Cypress.on("uncaught:exception", (e, runnable) =>{
    return false
})