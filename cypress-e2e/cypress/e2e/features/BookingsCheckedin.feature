Feature: Hotel Admin Checked IN Bookings page validation
    As a tester i want to validate the Checked IN Bookings page to ensure it displays correctly

    @automated @validatepage
    Scenario: On Roxandrea staff module i validate that i can reach the pending booking page when logged in
    Given I am a logged in user on the Roxandrea Staff Module
    When I navigate to the "Active Bookings" page on the Roxandrea Staff Module
    Then I should see the "Checked-In Bookings" page rendered with the correct url and the correct page header "Checked-In Bookings"

    @automated @validatepage
    Scenario: On Roxandrea staff module i ensure all elements are present and rendered correctly
    Given I am a logged in user on the Roxandrea Staff Module
    When I navigate to the "Checked-In Bookings" page on the Roxandrea Staff Module
    Then I should see a "Search Bar" and "Export Button" and an "+" Button right of the "Checked-In Bookings" header
    Then I should see a Bookings Table on the page
    Then I should see a spinner while table loads
    Then I should see a select dropdown an Apply button and a Search Icon button above just above the table
    When I click the Bulk Action dropdown
    Then I should see options "Bulk Action" "Check Out" and "Cancel Booking"
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
    
    

