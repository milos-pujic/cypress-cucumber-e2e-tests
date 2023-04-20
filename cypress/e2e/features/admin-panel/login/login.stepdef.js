const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');

const redBorder = 'border: 1px solid red';

When('Tries to login with valid username and password', () => {
  cy.fixture('users.json').then((users) => {
    cy.loginViaUI(users.admin.username, users.admin.password);
  });
});

When('Tries to login with only valid password', () => {
  cy.fixture('users.json').then((users) => {
    cy.loginViaUI(null, users.admin.password);
  });
});

When('Tries to login with only valid username', () => {
  cy.fixture('users.json').then((users) => {
    cy.loginViaUI(users.admin.username, null);
  });
});

When('Tries to login with wrong password', () => {
  cy.fixture('users.json').then((users) => {
    cy.loginViaUI(users.admin.username, 'wrong_password');
  });
});

Then('User is Logged In', () => {
  cy.xpath('//a[text()="Logout"]').should('be.visible');
});

Then('User is redirected to Rooms Management Page', () => {
  cy.contains('Room #');
  cy.contains('Type');
  cy.contains('Accessible');
  cy.contains('Price');
  cy.contains('Room details');
});

Then('User is still on Booking Management login page', () => {
  cy.contains('Log into your account');
});

Then('Username field will have red border', () => {
  cy.get('#username').should('have.attr', 'style').as(redBorder);
});

Then('Password field will have red border', () => {
  cy.get('#password').should('have.attr', 'style').as(redBorder);
});

Then('Both Username and Passwords fields will have red border', () => {
  cy.get('#username').should('have.attr', 'style').as(redBorder);
  cy.get('#password').should('have.attr', 'style').as(redBorder);
});
