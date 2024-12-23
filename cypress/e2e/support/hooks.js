const { Before, After } = require('@badeball/cypress-cucumber-preprocessor');
const allure = require('allure-js-commons');
const { v5 } = require('uuid');

Before(() => {
  updateTestNameAndHistoryIdForAllure();
  if (Cypress.isBrowser('!firefox')) cy.setCookie('banner', 'true');
  cy.wrap([]).as('roomIds');
  cy.wrap([]).as('roomNames');
  cy.wrap(false).as('roomsCreated');
});

After(() => {
  cy.get('@roomsCreated').then((roomsCreated) => {
    if (roomsCreated) {
      cy.log('Deleting Rooms...');
      cy.get('@roomIds').then((roomIds) => {
        roomIds.forEach((roomId) => {
          cy.deleteRoomViaApi(roomId);
        });
      });
      cy.get('@roomNames').then((roomNames) => {
        roomNames.forEach((roomName) => {
          cy.deleteAllRoomsViaApi(roomName);
        });
      });
    } else {
      cy.log('There are NO Rooms Created. Skipping...');
    }
  });
});

function updateTestNameAndHistoryIdForAllure() {
  const newName = `${Cypress.browser.name}: ${Cypress.currentTest.title}`;
  allure.displayName(newName);
  const newHistoryId = generateConsistentHistoryId(newName);
  allure.historyId(newHistoryId);
}

function generateConsistentHistoryId(name) {
  const NAMESPACE = 'b0dd5ec1-6e89-4851-8b7f-f50b09f4678a';
  return v5(name, NAMESPACE);
}
