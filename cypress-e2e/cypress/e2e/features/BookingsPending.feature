Feature: Hotel Admin Pending Bookings page validation
    As a tester i want to validate the Pending Bookings page to ensure it displays correctly

    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that i can reach the pending booking page when logged in
        Given I am a logged in user on the Roxandrea Staff Module
        When I navigate to the "Pending Bookings" page on the Roxandrea Staff Module
        Then I should see the "Pending Bookings" page rendered with the correct url and the correct page header "Pending Bookings"

    @automated @validatepage
    Scenario: On Roxandrea staff module i ensure all elements are present and rendered correctly
        Given I am a logged in user on the Roxandrea Staff Module
        Given I have created a new booking
        When I navigate to the "Pending Bookings" page on the Roxandrea Staff Module
        Then I should see a "Search Bar" and "Export Button" and an "+" Button right of the "Pending Bookings" header
        Then I should see a Bookings Table on the page
        Then I should see a spinner while table loads
        Then I should see a select dropdown an Apply button and a Search Icon button above just above the table
        When I click the Bulk Action dropdown
        Then I should see options "Bulk Action" "Check In" and "Cancel Booking"
        When I click the table search icon
        Then I should no longer see the select dropdown and Apply button
        Then The Total bookings count header should correctly reflect the total amount of rows in the table
        Then All headers must be correctly displayed in the Table:
        |Headers|
        |Customer|
        |Booking ID|
        |Package|
        |Mobile|
        |Arrive|
        |Depart|
        |Payment|
        Then I ensure all rows in the table have a ROX-ID with length "13"
    
    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that i can check in for any rooms by clicking the checkin link for the room pill
        Given I am a logged in user on the Roxandrea Staff Module
        Given I have created a new booking
        When I navigate to the "Pending Bookings" page on the Roxandrea Staff Module
        Then I should see that the a reservation with reservation token of the last created order exists
        Then I should see that the other details in the table match the last created order
        When I expand a table row to view more details by clicking the "Booking ID"
        Then I should see a side drawn modal
        Then I should see that the black "CHECK IN" Button is 'enabled'
        When I click the "Check In" link for each room pill the "Number of CheckIns" field is updated for each and each pill "Check In" link vanishes
        Then I should see that an alert with "success" status pops up with message
        And I should see that "Number of CheckIns" field is same as the number of room pills present
        Then I should see that the black "CHECK IN" Button is 'disabled'

    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that i can check in for any rooms by clicking the checkin link for the room pill
        Given I am a logged in user on the Roxandrea Staff Module
        Given I have created a new booking
        When I navigate to the "Pending Bookings" page on the Roxandrea Staff Module
        Then I should see that the a reservation with reservation token of the last created order exists
        Then I should see that the other details in the table match the last created order
        When I expand a table row to view more details by clicking the "Booking ID"
        Then I should see a side drawn modal
        Then I should see that the black "CHECK IN" Button is 'enabled'
        When I click the "Check In" link for each room pill the "Number of CheckIns" field is updated for each and each pill "Check In" link vanishes
        Then I should see that an alert with "success" status pops up with message
        And I should see that "Number of CheckIns" field is same as the number of room pills present
        Then I should see that the black "CHECK IN" Button is 'disabled'


    
    

