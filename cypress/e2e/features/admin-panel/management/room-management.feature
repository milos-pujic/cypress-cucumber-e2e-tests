@management @room-management
Feature: Rooms Management

  Logged in Users (Administrators), must be able to create new rooms through Room Management page by filling up all mandatory fields and selecting room room features.
  If any of the mandatory fields is missing, proper mandatory error message must be displayed.
  If any of the fields is filled in with invalid data, proper validation error message must be displayed.

  Background: User is logged in as Administrator and located on Rooms Management Page
    Given User is logged in as Administrator
    And User is on the Rooms Management Page

  Scenario Outline: User must be able to create new room by filling up all mandatory fields
    When User creates new '<room_type>' type '<accessibility>' room '<room_name>' priced at '<room_price>' GBP with '<features>'
    Then New '<room_type>' type '<accessibility>' room '<room_name>' priced at '<room_price>' GBP with '<features>' will be created
    Examples:
      | room_name | room_type | room_price | accessibility  | features                                      |
      | 114       | Single    | 80         | Not Accessible | no features added to the room                 |
      | 115       | Twin      | 150        | Not Accessible | WiFi, TV and Safe                             |
      | 116       | Double    | 200        | Accessible     | WiFi, TV, Refreshments and Safe               |
      | 117       | Family    | 250        | Accessible     | WiFi, TV, Radio, Refreshments, Safe and Views |
      | 118       | Suite     | 300        | Accessible     | WiFi, TV, Radio, Refreshments, Safe and Views |

  Scenario: User must NOT be able to create new room without filling up room name field
    When User creates new 'Twin' type 'Not Accessible' room priced at '55' GBP with 'WiFi and TV' without filling up room name field
    Then User will get mandatory error message: 'Room name must be set'

  Scenario: User must NOT be able to create new room without filling up room price field
    When User creates new 'Twin' type 'Not Accessible' room '314' with 'WiFi, TV and Safe' without filling up room price field
    Then User will get mandatory error message: 'must be greater than or equal to 1'

  Scenario: User must NOT be able to create new room with price 0
    When User creates new 'Single' type 'Not Accessible' room '214' priced at '0' GBP with 'no features added to the room'
    Then User will get validation error message: 'must be greater than or equal to 1'