import { Given } from '@badeball/cypress-cucumber-preprocessor';

import { getUrl } from '../../support/env-utility';

const url = getUrl();

Given('User is on the Booking Management Login Page', () => {
  cy.visit(`${url}/#/admin`);
  cy.contains('Log into your account');
});

Given('User is on the Rooms Management Page', () => {
  cy.visit(`${url}/#/admin`);
  cy.contains('Room #');
  cy.contains('Type');
  cy.contains('Accessible');
  cy.contains('Price');
  cy.contains('Room details');
});

Given('Visitor is on the Front Page', () => {
  cy.visit(`${url}`);
});

Given('User is logged in as Administrator', () => {
  cy.fixture('users.json').then((users) => {
    cy.loginViaApi(users.admin.username, users.admin.password);
  });
});
