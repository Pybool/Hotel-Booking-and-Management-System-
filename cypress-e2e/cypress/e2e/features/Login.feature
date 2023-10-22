Feature: Hotel Admin Staff Login
    As a tester i want to validate the login page to ensure it displays correctly

    @automated @validatepage
    Scenario: On Roxandrea staff module i validate login page
    When I navigate to the "login" page on the Roxandrea Staff Module
    Then I should see the "login" page rendered with the correct url and the page header "Login" with color "rgb(225, 31, 64)"
    Then I should see a label "Email Address"
    Then I should see the "email" input field
    Then I should see a label "Password"
    Then I should see the "password" input field
    Then I should see a "Forgot password?" link with color "rgb(225, 31, 64)"
    Then I should see a "Login" Button with background color "rgb(225, 31, 64)" and color "rgb(255, 255, 255)"

    @automated @functional
    Scenario: On Roxandrea staff module i proceed to enter incorrerct credentials and unable to login
    When I navigate to the "login" page on the Roxandrea Staff Module
    Then I enter my wrong credentials and sign in
    Then I should be remain on the login page 
    and see an alert with text "Wrong credentials supplied" having background color 'red'

    @automated @functional
    Scenario: On Roxandrea staff module i proceed to enter my correct credentials and login successfully
    When I navigate to the "login" page on the Roxandrea Staff Module
    Then I enter my credentials and sign in
    Then I should be redirected to the "dashboard" page
