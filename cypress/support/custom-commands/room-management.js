const { getApiUrl } = require('../env-utility');

const apiUrl = getApiUrl();

function getImage(roomType) {
  if (roomType == 'Single') return 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg';
  else if (roomType == 'Twin') return 'https://images.pexels.com/photos/14021932/pexels-photo-14021932.jpeg';
  else if (roomType == 'Double') return 'https://images.pexels.com/photos/11857305/pexels-photo-11857305.jpeg';
  else if (roomType == 'Family') return 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg';
  else return 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg';
}

const enterRoomName = (roomName) => {
  if (roomName != null && roomName != undefined && roomName != '') {
    cy.get('[data-testid="roomName"]').type(roomName);
  }
};

const enterRoomPrice = (roomPrice) => {
  if (roomPrice != null && roomPrice != undefined && roomPrice != '') {
    cy.get('#roomPrice').type(roomPrice);
  }
};

const selectRoomType = (roomType) => {
  if (roomType != null && roomType != undefined && roomType != '') {
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
  cy.get('@roomNames').then((roomNames) => {
    cy.wrap([...roomNames, name]).as('roomNames');
  });
  cy.wrap(true).as('roomsCreated');
});

Cypress.Commands.add('createRoomViaApi', (name, price, type, accessible, features) => {
  cy.deleteAllRoomsViaApi(name);
  cy.request({
    method: 'POST',
    url: `${apiUrl}/room/`,
    body: {
      roomName: name,
      roomPrice: price,
      type: type,
      accessible: accessible,
      image: getImage(type),
      features: features
    },
    failOnStatusCode: true
  }).then((response) => {
    expect(response.status).to.eq(201);
    cy.get('@roomIds').then((roomIds) => {
      cy.wrap([...roomIds, response.body.roomid]).as('roomIds');
    });
    cy.wrap(true).as('roomsCreated');
  });
});

Cypress.Commands.add('deleteBookingViaApi', (bookingId) => {
  cy.request({
    method: 'DELETE',
    url: `${apiUrl}/booking/${bookingId}`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.be.oneOf([202, 404]);
  });
});

Cypress.Commands.add('deleteAllBookingsViaApi', (roomId) => {
  cy.request({
    method: 'GET',
    url: `${apiUrl}/booking/`,
    qs: {
      roomId: roomId
    },
    failOnStatusCode: true
  }).then((response) => {
    expect(response.status).to.eq(200);
    if (response.body.bookings.length > 0) {
      cy.get(response.body.bookings).each((booking) => {
        cy.deleteBookingViaApi(booking.bookingid);
      });
    }
  });
});

Cypress.Commands.add('deleteRoomViaApi', (roomId) => {
  cy.deleteAllBookingsViaApi(roomId);
  cy.request({
    method: 'DELETE',
    url: `${apiUrl}/room/${roomId}`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.be.oneOf([202, 404]);
    cy.get('@roomsCreated').then((roomsCreated) => {
      if (roomsCreated) {
        cy.get('@roomIds').then((roomIds) => {
          const index = roomIds.indexOf(roomId);
          if (index > -1) roomIds.splice(index, 1);
          cy.wrap(roomIds).as('roomIds');
          if (roomIds.length == 0) cy.wrap(false).as('roomsCreated');
        });
      }
    });
  });
});

Cypress.Commands.add('deleteAllRoomsViaApi', (roomName) => {
  cy.request({
    method: 'GET',
    url: `${apiUrl}/room/`,
    failOnStatusCode: true
  }).then((response) => {
    expect(response.status).to.eq(200);
    if (response.body.rooms.length > 0) {
      cy.get(response.body.rooms).each((room) => {
        if (room.roomName == roomName) cy.deleteRoomViaApi(room.roomid);
      });
      cy.get('@roomNames').then((roomNames) => {
        const index = roomNames.indexOf(roomName);
        if (index > -1) roomNames.splice(index, 1);
        cy.wrap(roomNames).as('roomNames');
        if (roomNames.length == 0) cy.wrap(false).as('roomsCreated');
      });
    }
  });
});
