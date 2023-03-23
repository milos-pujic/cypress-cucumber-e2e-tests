import { When, Then, Step } from '@badeball/cypress-cucumber-preprocessor';

const validRoomTypes = ['Single', 'Twin', 'Double', 'Family', 'Suite'];

const toLowerCase = (value) => value.toLowerCase();
const capitalizeFirstLetter = (value) => toLowerCase(value).charAt(0).toUpperCase() + toLowerCase(value).slice(1);
const parsedRoomType = (roomType) => (validRoomTypes.includes(capitalizeFirstLetter(roomType)) ? capitalizeFirstLetter(roomType) : 'Single');
const hasFeature = (feature, features) => features.toLowerCase().includes(feature);
const isAccessible = (accessibility) => (accessibility.toLowerCase().includes('not') ? 'false' : 'true');

When(
  'User creates new {string} type {string} room {string} priced at {string} GBP with {string}',
  (roomType, accessibility, roomName, roomPrice, features) => {
    const hasWifi = hasFeature('wifi', features);
    const hasTv = hasFeature('tv', features);
    const hasRadio = hasFeature('radio', features);
    const hasRefreshments = hasFeature('refreshments', features);
    const hasSafe = hasFeature('safe', features);
    const hasViews = hasFeature('views', features);
    const accessible = isAccessible(accessibility);
    cy.createRoom(roomName, roomPrice, parsedRoomType(roomType), accessible, hasWifi, hasTv, hasRadio, hasRefreshments, hasSafe, hasViews);
  }
);

When(
  'User creates new {string} type {string} room priced at {string} GBP with {string} without filling up room name field',
  (roomType, accessibility, roomPrice, features) => {
    Step(this, `User creates new '${roomType}' type '${accessibility}' room '' priced at '${roomPrice}' GBP with '${features}'`);
  }
);

When(
  'User creates new {string} type {string} room {string} with {string} without filling up room price field',
  (roomType, accessibility, roomName, features) => {
    Step(this, `User creates new '${roomType}' type '${accessibility}' room '${roomName}' priced at '' GBP with '${features}'`);
  }
);

Then(
  'New {string} type {string} room {string} priced at {string} GBP with {string} will be created',
  (roomType, accessibility, roomName, roomPrice, features) => {
    const hasWifi = hasFeature('wifi', features);
    const hasTv = hasFeature('tv', features);
    const hasRadio = hasFeature('radio', features);
    const hasRefreshments = hasFeature('refreshments', features);
    const hasSafe = hasFeature('safe', features);
    const hasViews = hasFeature('views', features);
    const accessible = isAccessible(accessibility);
    let roomFeatures = [];
    if (hasWifi) roomFeatures.push('WiFi');
    if (hasTv) roomFeatures.push('TV');
    if (hasRadio) roomFeatures.push('Radio');
    if (hasRefreshments) roomFeatures.push('Refreshments');
    if (hasSafe) roomFeatures.push('Safe');
    if (hasViews) roomFeatures.push('Views');

    cy.xpath(`//div[@data-testid='roomlisting'][.//p[contains(@id,'${roomName}')]]`).should('exist').last().as('roomRecord');
    cy.get('@roomRecord').within(() => {
      cy.get('p[id*=roomName]').should('have.text', roomName);
      cy.get('p[id*=type]').should('have.text', parsedRoomType(roomType));
      cy.get('p[id*=accessible]').should('have.text', accessible);
      cy.get('p[id*=roomPrice]').should('have.text', roomPrice);
      cy.get('p[id*=details]').should('have.text', roomFeatures.length == 0 ? 'No features added to the room' : roomFeatures.join(', '));
    });
  }
);

Then('User will get validation/mandatory error message: {string}', (message) => {
  cy.get('div.alert').within(() => {
    cy.get('p').contains(message);
  });
});
