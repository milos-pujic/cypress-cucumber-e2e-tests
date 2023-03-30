Feature: Invalid Data Validation on Contact Hotel

  Visitors must be able to contact the property by filling up all mandatory fields with valid values on contact form with valid data and clicking Submit button.
  If any of the fields is filled in with invalid data, proper validation error message must be displayed.

  Background: Visitor is on the Front Page
    Given Visitor is on the Front Page

  Scenario Outline: Visitor must NOT be able to contact the property by filling up email with invalid value: <invalid_email>
    When Visitor 'John Doe' tries to contact property regarding 'Special Accommodation' by filling up email with invalid value: '<invalid_email>'
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

  Scenario Outline: Visitor must NOT be able to contact the property by filling up the phone with invalid length value: <invalid_phone>
    When Visitor 'John Doe' tries to contact property regarding 'Special Accommodation' by filling up phone with invalid value: '<invalid_phone>'
    Then Visitor will get validation error message: 'Phone must be between 11 and 21 characters'
    Examples:
      | invalid_phone          |
      | 1234567890             |
      | 1234567890123456789012 |

  Scenario Outline: Visitor must be able to contact the property by filling up phone with valid length value: <valid_phone>
    When Visitor 'John Doe' tries to contact property regarding 'Special Accommodation' by filling up phone with valid value: '<valid_phone>'
    Then Visitor 'John Doe' will get Thanks for getting in touch message regarding subject 'Special Accommodation'
    Examples:
      | valid_phone           |
      | 12345678901           |
      | 123456789012345678901 |

  Scenario Outline: Visitor must NOT be able to contact the property by filling up the subject with invalid length value of <subject_length>, less than 5 and more than 100 characters
    When Visitor 'John Doe' tries to contact property by filling up subject with value length of <subject_length> characters
    Then Visitor will get validation error message: 'Subject must be between 5 and 100 characters'
    Examples:
      | subject_length |
      | 4              |
      | 101            |

  Scenario Outline: Visitor must be able to contact the property by filling up the subject with valid length value of <subject_length>, between 5 and 100 characters
    When Visitor 'John Doe' tries to contact property by filling up subject with value length of <subject_length> characters
    Then Visitor 'John Doe' will get Thanks for getting in touch message
    Examples:
      | subject_length |
      | 5              |
      | 100            |

  Scenario Outline: Visitor must NOT be able to contact the property by filling up the message with invalid length value of <message_length>, less than 20 and more than 2000 characters
    When Visitor 'John Doe' tries to contact property regarding 'Special Accommodation' by filling up message with value length of <message_length> characters
    Then Visitor will get validation error message: 'Message must be between 20 and 2000 characters'
    Examples:
      | message_length |
      | 19             |
      | 2001           |

  Scenario Outline: Visitor must be able to contact the property by filling up the message with valid length value of <message_length>, between 20 and 2000 characters
    When Visitor 'John Doe' tries to contact property regarding 'Special Accommodation' by filling up message with value length of <message_length> characters
    Then Visitor 'John Doe' will get Thanks for getting in touch message regarding subject 'Special Accommodation'
    Examples:
      | message_length |
      | 20             |
      | 2000           |

