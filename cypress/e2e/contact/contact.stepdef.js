import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

When('Visitor {string} tries to contact property regarding {string} by filling up all mandatory fields with valid data', (fullName, subject) => {
  cy.sendMessage(fullName, faker.internet.email(), faker.phone.number(), subject, faker.lorem.text());
});

When('Visitor {string} tries to contact property regarding {string} by filling up all mandatory fields with valid data', (fullName, subject) => {
  cy.sendMessage(fullName, faker.internet.email(), faker.phone.number(), subject, faker.lorem.text());
});

Then('Visitor {string} will get Thanks for getting in touch message regarding subject {string}', (fullName, subject) => {
  cy.get('div.contact').within(() => {
    cy.get('h2').should('have.text', `Thanks for getting in touch ${fullName}!`);
    cy.get('[style="font-weight: bold;"]').should('have.text', subject);
  });
});
