const clickBookThisRoom = (roomName) => {
  cy.xpath(`//div[./div/img[contains(@alt,'${roomName}')]]//button`).last().click();
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
  cy.get('.rbc-toolbar').find('button:contains("Next")').click();
  cy.get('.rbc-month-view > .rbc-month-row').first().find('.rbc-day-bg:not(.rbc-off-range-bg)').first().as('start');
  cy.get('.rbc-month-view > .rbc-month-row').last().find('.rbc-day-bg:not(.rbc-off-range-bg)').last().as('end');
  cy.get('@start').trigger('mousedown');
  cy.get('@end').trigger('mousemove').trigger('mouseup');
};

const clickBook = () => {
  cy.xpath('//button[text()="Book"]').click();
};

Cypress.Commands.add('bookRoom', (roomName, firstName, lastName, email, phone) => {
  clickBookThisRoom(roomName);
  enterFirstName(firstName);
  enterLastName(lastName);
  enterEmail(email);
  enterPhone(phone);
  setBookingDates();
  clickBook();
});

Cypress.Commands.add('bookRoomWithNoDates', (roomName, firstName, lastName, email, phone) => {
  clickBookThisRoom(roomName);
  enterFirstName(firstName);
  enterLastName(lastName);
  enterEmail(email);
  enterPhone(phone);
  clickBook();
});
