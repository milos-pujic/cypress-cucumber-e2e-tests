const clickBookThisRoom = (roomName) => {
  cy.xpath(`//div[./div/img[contains(@alt,'${roomName}')]]//button`).click();
};

const enterFirstName = (firstName) => {
  if (firstName != null && firstName != undefined && firstName != '') {
    cy.get('input.room-firstname').type(firstName);
  }
};

const enterLastName = (lastName) => {
  if (lastName != null && lastName != undefined && lastName != '') {
    cy.get('input.room-lastname').type(lastName);
  }
};

const enterEmail = (email) => {
  if (email != null && email != undefined && email != '') {
    cy.get('input.room-email').type(email);
  }
};

const enterPhone = (phone) => {
  if (phone != null && phone != undefined && phone != '') {
    cy.get('input.room-phone').type(phone);
  }
};

const setBookingDates = () => {
  // Set booking dates from today until last day in calendar
  cy.get('.rbc-today').trigger('mousedown', { which: 1 });
  cy.get(':last-child > .rbc-row-bg > :last-child').trigger('mousemove').trigger('mouseup');
};

const clickBook = () => {
  cy.xpath('//button[text()="Book"]').click();
};

Cypress.Commands.add('bookRoom', (roomName, firstName, lastName, email, phone) => {
  cy.contains('home page').click();
  cy.clickBookThisRoom(roomName);
  cy.enterFirstName(firstName);
  cy.enterLastName(lastName);
  cy.enterEmail(email);
  cy.enterPhone(phone);
  cy.setBookingDates();
  cy.clickBook();
});

Cypress.Commands.add('bookRoomWithNoDates', (roomName, firstName, lastName, email, phone) => {
  cy.contains('home page').click();
  cy.clickBookThisRoom(roomName);
  cy.enterFirstName(firstName);
  cy.enterLastName(lastName);
  cy.enterEmail(email);
  cy.enterPhone(phone);
  cy.clickBook();
});
