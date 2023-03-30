Feature: Login

  Administrators must be able to login with correct username and password.
  Users must not be able to login with invalid combination of username and password or empty username or password.

  Background: User is on Booking Management Login Page
    Given User is on the Booking Management Login Page

  Scenario: Administrator is able to login with correct username and password
    When Tries to login with valid username and password
    Then User is Logged In
    And User is redirected to Rooms Management Page

  Scenario: User is not able to login with empty username
    When Tries to login with only valid password
    Then User is still on Booking Management login page
    And Username field will have red border

  Scenario: User is not able to login with empty password
    When Tries to login with only valid username
    Then User is still on Booking Management login page
    And Password field will have red border

  Scenario: User is not able to login with wrong password
    When Tries to login with wrong password
    Then User is still on Booking Management login page
    And Both Username and Passwords fields will have red border