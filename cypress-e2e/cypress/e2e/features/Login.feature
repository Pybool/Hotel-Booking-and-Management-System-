Feature: Hotel Staff Login
    As a tester i want to validate the login page to ensure it displays correctly

    @automated @validatepage
    Scenario: On Roxandrea staff module i validate login page
    When I navigate to the "login" page on the Roxandrea Admin Module
    Then I should see the "login" page rendered with the correct url and the page header "Login" with color "rgb(225, 31, 64)"
    Then I should see a label "Email Address"
    Then I should see the "email" input field
    Then I should see a label "Password"
    Then I should see the "password" input field
    Then I should see a "Forgot password?" link with color "rgb(225, 31, 64)"
    Then I should see a "Login" Button with background color "rgb(225, 31, 64)" and color "rgb(255, 255, 255)"

    @automated @functional
    Scenario: On Roxandrea staff module i proceed to enter my credentials and login
    When I navigate to the "login" page on the Roxandrea Admin Module
    Then I type in my "USERNAME" in the input field
    Then I type in my "PASSWORD" in the input field
    # When I click the login button
