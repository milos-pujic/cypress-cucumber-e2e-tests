import { Before, After } from '@badeball/cypress-cucumber-preprocessor';

Before({ tags: 'not @banner' }, () => {
  // Executed before each scenario not tagged with @banner tag
  cy.setCookie('banner', 'true');
});

Before({ tags: 'not @banner' }, () => {
  cy.log('Executed Before Each Scenario');
});

After(() => {
  cy.log('Executed After Each Scenario');
});
