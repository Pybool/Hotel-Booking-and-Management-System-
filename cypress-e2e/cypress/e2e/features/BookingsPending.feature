Feature: Hotel Admin Pending Bookings page validation
    As a tester i want to validate the Pending Bookings page to ensure it displays correctly

    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that i can reach the pending booking page when logged in
    Given I am a logged in user on the Roxandrea Staff Module
    When I navigate to the "Pending Bookings" page on the Roxandrea Staff Module
    Then I should see the "Pending Bookings" page rendered with the correct url and the correct page header "Pending Bookings"

