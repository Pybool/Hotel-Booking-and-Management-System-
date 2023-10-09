

import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';

import Commonpage from '../pom/commonpage'
const commonPage = Commonpage

Then('I should see that all navlinks for {string} are present', (userType) => {
    commonPage.validateLinks(userType)
})



    
