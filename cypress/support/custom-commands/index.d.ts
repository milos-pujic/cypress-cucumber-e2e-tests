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
  }
}
