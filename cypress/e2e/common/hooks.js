import { Before, After } from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
  cy.setCookie('banner', 'true');
});

After(() => {
  cy.log('Executed After Each Scenario');
});
