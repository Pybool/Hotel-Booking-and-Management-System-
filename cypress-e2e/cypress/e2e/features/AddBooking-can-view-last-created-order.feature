Feature: Hotel Admin Add Bookings 
    As a tester i want to validate i can see the last created order in the Pending Bookings Table

@automated @validatepage
    Scenario: On Roxandrea staff module i validate that i can see the last created order in the Pending Bookings Table
        Given I am a logged in user on the Roxandrea Staff Module
        When I navigate to the "Pending Bookings" page on the Roxandrea Staff Module
        Then I should see that the a reservation with reservation token of the last created order exists
        Then I should see that the other details in the table match the last created order
        # When I expand a table row to view more details by clicking the "Booking ID"
        # Then I should see a side drawn modal
        # And The side drawn modal should have "Booking ID" field with value same as that on the table row
        # And The side drawn modal should have "Firstname" field with value same as that on the table row
        # And The side drawn modal should have "Lastname" field with value same as that on the table row
        # And The side drawn modal should have "Email" field with value same as that on the table row
        # And The side drawn modal should have "Phone" field with value same as that on the table row
        # And The side drawn modal should have an "Address" field
        # And The side drawn modal should have "Number of CheckIns" field with value 'N/A' initially
        # And I should see rooms pills with same Room Numbers as those selected in the last created order
        # And I should see a black "CHECK IN" Button with the appropriate css properties
        # And I should see a close button at the bottom of the modal