import { getApiUrl } from '../env-utility';

const apiUrl = getApiUrl();

const enterRoomName = (roomName) => {
  if (roomName != null) {
    cy.get('[data-testid="roomName"]').type(roomName);
  }
};

const enterRoomPrice = (roomPrice) => {
  if (roomPrice != null) {
    cy.get('#roomPrice').type(roomPrice);
  }
};

const selectRoomType = (roomType) => {
  if (roomType != null) {
    cy.get('#type').select(roomType);
  }
};

const selectAccessible = (accessible) => {
  if (accessible != null) {
    cy.get('#accessible').select(accessible);
  }
};

const hasWifi = (wifi) => {
  if (wifi != null && wifi) {
    cy.get('#wifiCheckbox').click();
  }
};

const hasTv = (tv) => {
  if (tv != null && tv) {
    cy.get('#tvCheckbox').click();
  }
};

const hasRadio = (radio) => {
  if (radio != null && radio) {
    cy.get('#radioCheckbox').click();
  }
};

const hasRefreshments = (refreshments) => {
  if (refreshments != null && refreshments) {
    cy.get('#refreshCheckbox').click();
  }
};

const hasSafe = (safe) => {
  if (safe != null && safe) {
    cy.get('#safeCheckbox').click();
  }
};

const hasViews = (views) => {
  if (views != null && views) {
    cy.get('#viewsCheckbox').click();
  }
};

const setAmenities = (wifi, tv, radio, refreshments, safe, views) => {
  hasWifi(wifi);
  hasTv(tv);
  hasRadio(radio);
  hasRefreshments(refreshments);
  hasSafe(safe);
  hasViews(views);
};

const clickCreate = () => {
  cy.get('#createRoom').click();
};

Cypress.Commands.add('createRoom', (name, price, type, accessible, wifi, tv, radio, refreshments, safe, views) => {
  enterRoomName(name);
  enterRoomPrice(price);
  selectRoomType(type);
  selectAccessible(accessible);
  setAmenities(wifi, tv, radio, refreshments, safe, views);
  clickCreate();
});

Cypress.Commands.add('createRoomViaApi', (name, price, type, accessible, features) => {
  cy.request({
    method: 'POST',
    url: `${apiUrl}/room/`,
    body: {
      roomName: name,
      roomPrice: price,
      type: type,
      accessible: accessible,
      features: features
    },
    failOnStatusCode: true
  }).then((response) => {
    expect(response.status).to.eq(201);
    cy.wrap(true).as('roomCreated');
    cy.wrap(response.body.roomid).as('roomId');
  });
});

Cypress.Commands.add('deleteRoomViaApi', (roomId) => {
  cy.request({
    method: 'DELETE',
    url: `${apiUrl}/room/${roomId}`,
    failOnStatusCode: true
  }).then((response) => {
    expect(response.status).to.be.oneOf([202, 404]);
    cy.wrap(false).as('roomCreated');
  });
});
