Feature: Contact

  Vistors must be able to contact the property by filling up all mandatory fields on conctact form with valid data and clicking Submit button.
  If any of the mandatory fields is missing proper mandatory message must be displayed.
  If any of the fields is filled in with invalid data validation message must be displayed.

  Background: Visitor is on the Front Page
    Given Visitor is on the Front Page

  Scenario: Vistor must be able to contact property by fillin up all mandatory fields
    When Visitor 'John Doe' tries to contact property regarding 'Special Accomodation' by filling up all mandatory fields with valid data
    Then Visitor 'John Doe' will get Thanks for getting in touch message regarding subject 'Special Accomodation'