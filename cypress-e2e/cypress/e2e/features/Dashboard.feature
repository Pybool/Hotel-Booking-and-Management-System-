Feature: Hotel Admin Dashboard validation
    As a tester i want to validate the dashboard page to ensure it displays correctly

    @automated @validatepage
    Scenario Outline: On Roxandrea staff module i validate that i am redirected to the login page when not logged in
    Given I am not logged in on the Roxandrea Staff Module
    When I navigate to the "<page>" page on the Roxandrea Staff Module
    Then I should be redirected to the "Login" page when not logged in

    Examples:
    | page |
    | dashboard |
    | pending_bookings |
    | active_bookings |


    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that i can reach the dashboard page when logged in
    Given I am a logged in user on the Roxandrea Staff Module
    When I navigate to the "dashboard" page on the Roxandrea Staff Module
    Then I should see the "dashboard" page rendered with the correct url and the correct page header "Roxandrea Dashboard"


    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that all navigation links are present for an administrator
    Given I am a logged in user on the Roxandrea Staff Module as an Administrator
    When I navigate to the "dashboard" page on the Roxandrea Staff Module
    Then I should see that all navlinks for "administrator" are present
    When I click the harburger icon on the top of the navbar to collapse the navbar
    Then I should see that the navbar is collapsed
    When I click the harburger icon on the top of the navbar to collapse the navbar
    Then I should see that the navbar is expanded
