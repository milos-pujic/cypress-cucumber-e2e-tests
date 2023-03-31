@booking
Feature: Invalid Data Validation when Booking a Room

  Visitor must be able to book a room for available dates by filling up all mandatory fields with valid values, selecting available date and clicking on Book button.
  If any of the fields is filled in with invalid data, proper validation error message must be displayed.

  Background: User is logged in as Administrator and has Created a New Room
    Given User is logged in as Administrator
    And User has created 'Single' type 'Accessible' room '1408' priced at '50' GBP with ' WiFi, TV, Refreshments and Safe'
    And Visitor is on the Front Page

  Scenario Outline: Visitor must NOT be able to book a room by filling up the first name with invalid length value of <first_name_length>, less than 3 and more than 18 characters
    When Visitor 'Doe' with an email 'john.doe@email.com' and phone number '+44 1632 960018' tries to book a room '1408' by filling up first name with value length of <first_name_length> characters
    Then Visitor will get validation error message: 'size must be between 3 and 18'
    Examples:
      | first_name_length |
      | 2                 |
      | 19                |

  Scenario Outline: Visitor must be able to book a room by filling up the first name with valid length value of <first_name_length>, more than 3 and less than 18 characters
    When Visitor 'Doe' with an email 'john.doe@email.com' and phone number '+44 1632 960018' tries to book a room '1408' by filling up first name with value length of <first_name_length> characters
    Then Visitor will get Booking Successful! message
    Examples:
      | first_name_length |
      | 3                 |
      | 18                |

  Scenario Outline: Visitor must NOT be able to book a room by filling up the last name with invalid length value of <last_name_length>, less than 3 and more than 30 characters
    When Visitor 'John' with an email 'john.doe@email.com' and phone number '+44 1632 960018' tries to book a room '1408' by filling up last name with value length of <last_name_length> characters
    Then Visitor will get validation error message: 'size must be between 3 and 30'
    Examples:
      | last_name_length |
      | 2                |
      | 31               |

  Scenario Outline: Visitor must be able to book a room by filling up the last name with valid length value of <last_name_length>, more than 3 and less than 30 characters
    When Visitor 'John' with an email 'john.doe@email.com' and phone number '+44 1632 960018' tries to book a room '1408' by filling up last name with value length of <last_name_length> characters
    Then Visitor will get Booking Successful! message
    Examples:
      | last_name_length |
      | 3                |
      | 30               |

  Scenario Outline: Visitor must NOT be able to book a room by filling up email with invalid value: <invalid_email>
    When Visitor 'John' 'Doe' with an invalid email '<invalid_email>' and phone number '+44 1632 960018' tries to book a room '1408'
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

  Scenario Outline: Visitor must NOT be able to book a room by filling up the phone with invalid length value of <phone_length>, less than 11 and more than 21 characters
    When Visitor 'John' 'Doe' with an email 'john.doe@email.com' tries to book a room '1408' by filling up phone with value length of <phone_length> characters
    Then Visitor will get validation error message: 'size must be between 11 and 21'
    Examples:
      | phone_length |
      | 10           |
      | 22           |

  Scenario Outline: Visitor must be able to book a room by filling up the phone with valid length value of <phone_length>, more than 11 and less than 21 characters
    When Visitor 'John' 'Doe' with an email 'john.doe@email.com' tries to book a room '1408' by filling up phone with value length of <phone_length> characters
    Then Visitor will get Booking Successful! message
    Examples:
      | phone_length |
      | 11           |
      | 21           |