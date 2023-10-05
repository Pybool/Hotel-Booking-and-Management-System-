

import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';


Then('I should see that all navlinks for {string} are present', (userType) => {
    commonPage.validateLinks(userType)
})



    
