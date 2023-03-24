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

Given(
  'User has created {string} type {string} room {string} priced at {string} GBP with {string}',
  (roomType, accessibility, roomName, roomPrice, features) => {
    const validRoomTypes = ['Single', 'Twin', 'Double', 'Family', 'Suite'];
    const toLowerCase = (value) => value.toLowerCase();
    const capitalizeFirstLetter = (value) => toLowerCase(value).charAt(0).toUpperCase() + toLowerCase(value).slice(1);
    const parsedRoomType = (roomType) => (validRoomTypes.includes(capitalizeFirstLetter(roomType)) ? capitalizeFirstLetter(roomType) : 'Single');
    const hasFeature = (feature, features) => toLowerCase(features).includes(toLowerCase(feature));
    const isAccessible = (accessibility) => !toLowerCase(accessibility).includes('not');
    let featureList = [];
    if (hasFeature('wifi', features)) featureList.push('WiFi');
    if (hasFeature('tv', features)) featureList.push('TV');
    if (hasFeature('radio', features)) featureList.push('Radio');
    if (hasFeature('refreshments', features)) featureList.push('Refreshments');
    if (hasFeature('safe', features)) featureList.push('Safe');
    if (hasFeature('views', features)) featureList.push('Views');
    cy.createRoomViaApi(roomName, roomPrice, parsedRoomType(roomType), isAccessible(accessibility), featureList);
  }
);
