import { Given } from '@badeball/cypress-cucumber-preprocessor';

import { getUrl } from '../../support/env-utility';

const url = getUrl();

Given('User is on the Booking Management Login Page', () => {
  cy.visit(`${url}/#/admin`);
});

Given('Visitor is on the Front Page', () => {
  cy.visit(`${url}`);
});
