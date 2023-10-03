Feature: Hotel Admin Dashboard validation
    As a tester i want to validate the dashboard page to ensure it displays correctly

    @automated @validatepage
    Scenario Outline: On Roxandrea staff module i validate that i am redirected to the login page when not logged in
    Given I am not logged in on the Roxandrea Admin Module
    When I navigate to the "<page>" page on the Roxandrea Admin Module
    Then I should be redirected to the "Login" page when not logged in

    Examples:
    | page |
    | dashboard |
    | upcoming_checkins |
    | active_checkins |


    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that i can reach the dashboard page when logged in
    Given I am a logged in user on the Roxandrea Admin Module
    When I navigate to the "dashboard" page on the Roxandrea Admin Module
    Then I should see the "dashboard" page rendered with the correct url and the correct page header "Roxandrea Dashboard"


    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that all navigation links are present
    Given I am a logged in user on the Roxandrea Admin Module
    When I navigate to the "dashboard" page on the Roxandrea Admin Module
    Then I should see that all navlinks are present


#  and sub-links are present all Navlinks with sublinks are closed by default