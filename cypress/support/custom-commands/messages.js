const enterContactName = (name) => {
  if (name != null && name != undefined && name != '') {
    cy.get('[data-testid="ContactName"]').type(name);
  }
};

const enterContactEmail = (email) => {
  if (email != null && email != undefined && email != '') {
    cy.get('[data-testid="ContactEmail"]').type(email);
  }
};

const enterContactPhone = (phone) => {
  if (phone != null && phone != undefined && phone != '') {
    cy.get('[data-testid="ContactPhone"]').type(phone);
  }
};

const enterContactSubject = (subject) => {
  if (subject != null && subject != undefined && subject != '') {
    cy.get('[data-testid="ContactSubject"]').type(subject);
  }
};

const enterContactMessage = (message) => {
  if (message != null && message != undefined && message != '') {
    if (message.length < 50) {
      cy.get('[data-testid="ContactDescription"]').clear().type(message);
    } else {
      cy.get('[data-testid="ContactDescription"]').clear().invoke('text', message).trigger('input');
    }
  }
};

const clickMessageSubmit = () => {
  cy.get('#submitContact').click();
};

Cypress.Commands.add('sendMessage', (name, email, phone, subject, message) => {
  enterContactName(name);
  enterContactEmail(email);
  enterContactPhone(phone);
  enterContactSubject(subject);
  enterContactMessage(message);
  clickMessageSubmit();
});
