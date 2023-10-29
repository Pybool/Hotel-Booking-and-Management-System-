Feature: Hotel Admin Add Bookings 
    As a tester i want to validate the Add Bookings page to ensure it displays correctly and Ensure i can create a booking

    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that i can reach a valid add booking page when logged in
        Given I am a logged in user on the Roxandrea Staff Module
        When I navigate to the "Add Booking" page on the Roxandrea Staff Module
        Then I should see the "Add Booking" page rendered with the correct url and the correct page header "Add Booking"
        # Then I verify that in the navigation bar the 'Add Booking' sub menu is active
        Then I ensure that all the needed input fields are present
        Then I confirm that there is an "Add Booking" button at the bottom of the page
        Then I check that the "Add Booking" button has the correct css properties 

    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that there are input validations on each suitable fields
        Given I am a logged in user on the Roxandrea Staff Module
        When I navigate to the "Add Booking" page on the Roxandrea Staff Module
        Then I type in an invalid characters in "firstname" field
        Then I should see a validation text below the "firstname" field with "invalid" text
        When I clear the "firstname" field
        Then I should see a validation text below the "firstname" field with "required" text
        Then I type in an invalid characters in "surname" field
        Then I should see a validation text below the "surname" field with "invalid" text
        When I clear the "surname" field
        Then I should see a validation text below the "surname" field with "required" text
        When I select an invalid "gender" in the form
        Then I should see a validation text below the "gender" field with "invalid" text
        Then I type in an invalid characters in "phone" field
        Then I should see a validation text below the "phone" field with "invalid" text
        When I clear the "phone" field
        Then I should see a validation text below the "phone" field with "required" text
        Then I type in an invalid characters in "email" field
        Then I should see a validation text below the "email" field with "invalid" text
        When I clear the "email" field
        Then I should see a validation text below the "email" field with "required" text


    

