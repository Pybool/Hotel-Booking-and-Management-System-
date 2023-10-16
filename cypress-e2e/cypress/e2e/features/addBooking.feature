Feature: Hotel Admin Add Bookings 
    As a tester i want to validate the Add Bookings page to ensure it displays correctly and Ensure i can create a booking

    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that i can reach a valid add booking page when logged in
    Given I am a logged in user on the Roxandrea Staff Module
    When I navigate to the "Add Booking" page on the Roxandrea Staff Module
    Then I should see the "Add Booking" page rendered with the correct url and the correct page header "Add Booking"
    Then I verify that in the navigation bar the 'Add Booking' sub menu is active
    Then I ensure that all the needed input fields are present
    

