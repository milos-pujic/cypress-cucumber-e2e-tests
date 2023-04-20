/* eslint-disable max-len */
const { When, Then, Step } = require('@badeball/cypress-cucumber-preprocessor');
const { faker } = require('@faker-js/faker');

When(
  'Visitor {string} {string} with an (invalid )email {string} and phone number {string} tries to book a room {string}',
  (firstName, lastName, email, phone, roomName) => {
    cy.bookRoom(roomName, firstName, lastName, email, phone);
  }
);

When(
  'Visitor {string} with an email {string} and phone number {string} tries to book a room {string} without filling up first name field',
  (lastName, email, phone, roomName) => {
    Step(this, `Visitor '' '${lastName}' with an email '${email}' and phone number '${phone}' tries to book a room '${roomName}'`);
  }
);

When(
  'Visitor {string} with an email {string} and phone number {string} tries to book a room {string} by filling up first name with value length of {int} characters',
  (lastName, email, phone, roomName, firstNameLength) => {
    const firstName = faker.random.alpha(firstNameLength);
    Step(this, `Visitor '${firstName}' '${lastName}' with an email '${email}' and phone number '${phone}' tries to book a room '${roomName}'`);
  }
);

When(
  'Visitor {string} with an email {string} and phone number {string} tries to book a room {string} without filling up last name field',
  (firstName, email, phone, roomName) => {
    Step(this, `Visitor '${firstName}' '' with an email '${email}' and phone number '${phone}' tries to book a room '${roomName}'`);
  }
);

When(
  'Visitor {string} with an email {string} and phone number {string} tries to book a room {string} by filling up last name with value length of {int} characters',
  (firstName, email, phone, roomName, lastNameLength) => {
    const lastName = faker.random.alpha(lastNameLength);
    Step(this, `Visitor '${firstName}' '${lastName}' with an email '${email}' and phone number '${phone}' tries to book a room '${roomName}'`);
  }
);

When(
  'Visitor {string} {string} with phone number {string} tries to book a room {string} without filling up email field',
  (firstName, lastName, phone, roomName) => {
    Step(this, `Visitor '${firstName}' '${lastName}' with an email '' and phone number '${phone}' tries to book a room '${roomName}'`);
  }
);

When(
  'Visitor {string} {string} with an email {string} tries to book a room {string} without filling up phone field',
  (firstName, lastName, email, roomName) => {
    Step(this, `Visitor '${firstName}' '${lastName}' with an email '${email}' and phone number '' tries to book a room '${roomName}'`);
  }
);

When(
  'Visitor {string} {string} with an email {string} tries to book a room {string} by filling up phone with value length of {int} characters',
  (firstName, lastName, email, roomName, phoneLength) => {
    const phone = faker.random.numeric(phoneLength);
    Step(this, `Visitor '${firstName}' '${lastName}' with an email '${email}' and phone number '${phone}' tries to book a room '${roomName}'`);
  }
);

When(
  'Visitor {string} {string} with an email {string} and phone number {string} tries to book a room {string} without setting the dates',
  (firstName, lastName, email, phone, roomName) => {
    cy.bookRoomWithNoDates(roomName, firstName, lastName, email, phone);
  }
);

Then('Visitor will get Booking Successful! message', () => {
  cy.get('.confirmation-modal')
    .should('be.visible')
    .within(() => {
      cy.get('h3').should('contain.text', 'Booking Successful!');
      cy.get('p').should('contain.text', 'Congratulations! Your booking has been confirmed');
    });
});

Then('Visitor will get validation/mandatory error message: {string}', (message) => {
  cy.get('div.alert').within(() => {
    cy.get('p').contains(message);
  });
});
