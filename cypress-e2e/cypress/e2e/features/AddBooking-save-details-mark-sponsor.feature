Feature: Hotel Admin Add Bookings 
    As a tester i want to validate i can create a new booking with rate selected in dropdown, with saving booking details to contact and with marking a contact as a sponsor

 @automated @validatepage
    Scenario: On Roxandrea staff module i validate that i can create a new booking with rate selected in dropdown, with saving booking details to contact and with marking a contact as a sponsor
        Given I am a logged in user on the Roxandrea Staff Module
        When I navigate to the "Add Booking" page on the Roxandrea Staff Module
        Then I type in a 'firstname' in the 'firstname' input field
        Then I type in a 'surname' in the 'surname' input field
        Then I select a 'gender' in the correct field
        Then I type in a 'phone' in the 'phone' input field
        Then I type in a 'email' in the 'email' input field
        Then I type in a 'address' in the 'address' input field
        Then I type in a 'advance' in the 'advance' input field
        Then I select an 'arrival' date
        Then I select an 'departure' date
        Then I select a room type
        Then I select rooms for the reservation
        Then I should see pills below the page matching the rooms selected with the correct css properties
        Then I type in the number of occupants
        And I select a 'contactType' in the dropdown
        And I select a 'contact' mail in the dropdown
        And I check the "Mark as Sponsor" checkbox
        Then I select a 'rate' in the 'rates' dropdown
        Then I select a 'package' in the 'package' dropdown
        And I check the "Save Booking Details to Contact" checkbox
        When I click the 'Add Booking' button
        Then The booking should be sucessfully created and displays an alert on the page