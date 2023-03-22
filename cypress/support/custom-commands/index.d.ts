// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Login by filling up username and password fields on B&B Booking Management login page and clicking on Login button.
     *
     * @param username username
     * @param password password
     */
    loginViaUI(username: any, password: any): Chainable<any>;
    /**
     * Login via API call with username and password.
     *
     * @param username username
     * @param password password
     */
    loginViaApi(username: any, password: any): Chainable<any>;
    /**
     * Contact hotel from the Front page by filling in all contact fields and clicking on Submit button.
     *
     * @param name contact name
     * @param email contact email
     * @param phone contact phone
     * @param subject contact subject
     * @param message contact description
     */
    sendMessage(name: any, email: any, phone: any, subject: any, message: any): Chainable<any>;
    /**
     * Create Hotel Room from the Room Management page by filling up all room details and clicking on Create button.
     *
     * @param name room name
     * @param price room price
     * @param type room type
     * @param accessible is room accessible
     * @param wifi room has wifi
     * @param tv room has tv
     * @param radio room has radio
     * @param refreshments room has refreshments
     * @param safe room has safe
     * @param views room has views
     */
    createRoom(
      name: string | null,
      price: string | null,
      type: string | null,
      accessible: string | null,
      wifi: boolean | null,
      tv: boolean | null,
      radio: boolean | null,
      refreshments: boolean | null,
      safe: boolean | null,
      views: boolean | null
    ): Chainable<any>;
    /**
     * Create Hotel Room via API call by sending up all room details.
     *
     * @param name room name
     * @param price room price
     * @param type room type
     * @param accessible is room accessible
     * @param features array of room feature, [WiFi', 'TV', 'Radio', 'Refreshments', 'Safe', 'Views']
     */
    createRoomViaApi(name: string, price: string, type: string, accessible: string, features: Array): Chainable<any>;
    /**
     * Delete Hotel Room via API call using Room ID.
     *
     * @param roomId room id
     */
    deleteRoomViaApi(roomId: string): Chainable<any>;
  }
}
