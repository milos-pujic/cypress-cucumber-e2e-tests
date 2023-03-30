import { Before, After } from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
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
