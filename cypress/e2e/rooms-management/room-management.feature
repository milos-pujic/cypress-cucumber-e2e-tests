Feature: Rooms Management

  Background: User is logged in as Administrator and located on Rooms Management Page
    Given User is logged in as Administrator
    And User is on the Rooms Management Page

  Scenario: User must be able to create new room by fillin up all mandatory fields
    When User creates new 'Twin' type 'Not Accessible' room '314' priced at '155' GBP with 'WiFi, TV, Radio, Refreshments, Safe and Views'
    Then New 'Twin' type 'Not Accessible' room '314' priced at '155' GBP with 'WiFi, TV, Radio, Refreshments, Safe and Views' will be created