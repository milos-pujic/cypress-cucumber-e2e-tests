import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

When('Visitor {string} tries to contact property regarding {string} by filling up all mandatory fields with valid data', (fullName, subject) => {
  cy.sendMessage(fullName, faker.internet.email(), faker.phone.number(), subject, faker.lorem.lines(5));
});

When('Visitor tries to contact property regarding {string} without filling up name field', (subject) => {
  cy.sendMessage(null, faker.internet.email(), faker.phone.number(), subject, faker.lorem.lines(5));
});

When('Visitor {string} tries to contact property regarding {string} without filling up email field', (fullName, subject) => {
  cy.sendMessage(fullName, null, faker.phone.number(), subject, faker.lorem.lines(5));
});

When('Visitor {string} tries to contact property regarding {string} without filling up phone field', (fullName, subject) => {
  cy.sendMessage(fullName, faker.internet.email(), null, subject, faker.lorem.lines(5));
});

When('Visitor {string} tries to contact property without filling up subject field', (fullName) => {
  cy.sendMessage(fullName, faker.internet.email(), faker.phone.number(), null, faker.lorem.lines(5));
});

When('Visitor {string} tries to contact property regarding {string} without filling up message field', (fullName, subject) => {
  cy.sendMessage(fullName, faker.internet.email(), faker.phone.number(), subject, null);
});

When('Visitor {string} tries to contact property regarding {string} by filling up email with invalid value: {string}', (fullName, subject, email) => {
  cy.sendMessage(fullName, email, faker.phone.number(), subject, faker.lorem.lines(5));
});

When(
  'Visitor {string} tries to contact property regarding {string} by filling up phone with valid/invalid value: {string}',
  (fullName, subject, phone) => {
    cy.sendMessage(fullName, faker.internet.email(), phone, subject, faker.lorem.lines(5));
  }
);

When('Visitor {string} tries to contact property by filling up subject with value length of {int} characters', (fullName, subjectLength) => {
  cy.sendMessage(fullName, faker.internet.email(), faker.phone.number(), faker.random.alpha(subjectLength), faker.lorem.lines(5));
});

When(
  'Visitor {string} tries to contact property regarding {string} by filling up message with value length of {int} characters',
  (fullName, subject, messageLength) => {
    cy.sendMessage(fullName, faker.internet.email(), faker.phone.number(), subject, faker.random.alpha(messageLength));
  }
);

Then('Visitor {string} will get Thanks for getting in touch message', (fullName) => {
  cy.get('div.contact').within(() => {
    cy.get('h2').should('have.text', `Thanks for getting in touch ${fullName}!`);
  });
});

Then('Visitor {string} will get Thanks for getting in touch message regarding subject {string}', (fullName, subject) => {
  cy.get('div.contact').within(() => {
    cy.get('h2').should('have.text', `Thanks for getting in touch ${fullName}!`);
    cy.get('[style="font-weight: bold;"]').should('have.text', subject);
  });
});

Then('Visitor will get validation/mandatory error message: {string}', (message) => {
  cy.get('div.alert').within(() => {
    cy.get('p').contains(message);
  });
});
