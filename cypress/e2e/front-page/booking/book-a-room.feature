Feature: Book a Room

  Vistior must be able to book a room for available dates by filling up all mandatory fields, selecting available date and clicking on Book button.
  If any of the mandatory fields is missing, proper mandatory message must be displayed.
  If any of the fields is filled in with invalid data, validation message must be displayed.
  If unavailable date are selected proper mandatory message must be displayed.

  Background: User is logged in as Administrator and has Created a New Room
    Given User is logged in as Administrator
    And User has created 'Single' type 'Accessible' room 'Room 214' priced at '50' GBP with ' WiFi, TV, Refreshments and Safe'
    And Visitor is on the Front Page

  Scenario: Vistor must be able to book a room for available dates by filling up all mandatory fields
    When Visitor 'John' 'Doe' with an email 'john.doe@email.com' and phone number '+44 1632 960018' tries to book a room 'Room 214'
    Then Visitor will get Booking Successful! message

  Scenario: Vistor must NOT be able to book a room without filling up first name field
    When Visitor 'Doe' with an email 'john.doe@email.com' and phone number '+44 1632 960018' tries to book a room 'Room 214' without filling up first name field
    Then Visitor will get mandatory error message: 'Firstname should not be blank'
    And Visitor will get validation error message: 'size must be between 3 and 18'

  Scenario Outline: Vistor must NOT be able to book a room by filling up the first name with invalid length value of <firstname_length>, less than 3 and more than 18 characters
    When Visitor 'Doe' with an email 'john.doe@email.com' and phone number '+44 1632 960018' tries to book a room 'Room 214' by filling up first name with value length of <firstname_length> characters
    Then Visitor will get validation error message: 'size must be between 3 and 18'
    Examples:
      | firstname_length |
      | 2                |
      | 19               |

  Scenario Outline: Vistor must be able to book a room by filling up the first name with valid length value of <firstname_length>, more than 3 and less than 18 characters
    When Visitor 'Doe' with an email 'john.doe@email.com' and phone number '+44 1632 960018' tries to book a room 'Room 214' by filling up first name with value length of <firstname_length> characters
    Then Visitor will get Booking Successful! message
    Examples:
      | firstname_length |
      | 3                |
      | 18               |


  Scenario: Vistor must NOT be able to book a room without filling up last name field
    When Visitor 'John' with an email 'john.doe@email.com' and phone number '+44 1632 960018' tries to book a room 'Room 214' without filling up last name field
    Then Visitor will get mandatory error message: 'Lastname should not be blank'
    And Visitor will get validation error message: 'size must be between 3 and 30'

  Scenario Outline: Vistor must NOT be able to book a room by filling up the last name with invalid length value of <lastname_length>, less than 3 and more than 30 characters
    When Visitor 'John' with an email 'john.doe@email.com' and phone number '+44 1632 960018' tries to book a room 'Room 214' by filling up last name with value length of <lastname_length> characters
    Then Visitor will get validation error message: 'size must be between 3 and 30'
    Examples:
      | lastname_length |
      | 2               |
      | 31              |

  Scenario Outline: Vistor must be able to book a room by filling up the last name with valid length value of <lastname_length>, more than 3 and less than 30 characters
    When Visitor 'John' with an email 'john.doe@email.com' and phone number '+44 1632 960018' tries to book a room 'Room 214' by filling up last name with value length of <lastname_length> characters
    Then Visitor will get Booking Successful! message
    Examples:
      | lastname_length |
      | 3               |
      | 30              |

  Scenario: Vistor must NOT be able to book a room without filling up email field
    When Visitor 'John' 'Doe' with phone number '+44 1632 960018' tries to book a room 'Room 214' without filling up email field
    Then Visitor will get mandatory error message: 'must not be empty'

  Scenario Outline: Vistor must NOT be able to book a room by filling up email with invalid value: <invalid_email>
    When Visitor 'John' 'Doe' with an invalid email '<invalid_email>' and phone number '+44 1632 960018' tries to book a room 'Room 214'
    Then Visitor will get validation error message: 'must be a well-formed email address'
    Examples:
      | invalid_email                 |
      | plainaddress                  |
      | #@%^%#$@#$@#.com              |
      | @example.com Joe Smith        |
      | <email@example.com>           |
      | email.example.com             |
      | email@example@example.com     |
      | .email@example.com            |
      | email..email@example.com      |
      | あいうえお@example.com        |
      | email@example.com (Joe Smith) |
      | email@example                 |
      | email@-example.com            |
      | email@example.web             |
      | email@111.222.333.44444       |
      | email@example..com            |
      | Abc..123@example.com          |

  Scenario: Vistor must NOT be able to book a room without filling up phone field
    When Visitor 'John' 'Doe' with an email 'john.doe@email.com' tries to book a room 'Room 214' without filling up phone field
    Then Visitor will get mandatory error message: 'must not be empty'
    And Visitor will get validation error message: 'size must be between 11 and 21'

  Scenario Outline: Vistor must NOT be able to book a room by filling up the phone with invalid length value of <phone_length>, less than 11 and more than 21 characters
    When Visitor 'John' 'Doe' with an email 'john.doe@email.com' tries to book a room 'Room 214' by filling up phone with value length of <phone_length> characters
    Then Visitor will get validation error message: 'size must be between 11 and 21'
    Examples:
      | phone_length |
      | 10           |
      | 22           |

  Scenario Outline: Vistor must be able to book a room by filling up the phone with valid length value of <phone_length>, more than 11 and less than 21 characters
    When Visitor 'John' 'Doe' with an email 'john.doe@email.com' tries to book a room 'Room 214' by filling up phone with value length of <phone_length> characters
    Then Visitor will get Booking Successful! message
    Examples:
      | phone_length |
      | 11           |
      | 21           |