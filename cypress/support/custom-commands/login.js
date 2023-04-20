const { getApiUrl } = require('../env-utility');

const apiUrl = getApiUrl();

const enterUserName = (username) => {
  if (username != null) {
    cy.get('#username').type(username);
  }
};

const enterPassword = (password) => {
  if (password != null) {
    cy.get('#password').type(password);
  }
};

const clickLogin = () => {
  cy.get('#doLogin').click();
};

Cypress.Commands.add('loginViaUI', (username, password) => {
  enterUserName(username);
  enterPassword(password);
  clickLogin();
});

Cypress.Commands.add('loginViaApi', (username, password) => {
  cy.request({
    method: 'POST',
    url: `${apiUrl}/auth/login`,
    body: {
      username: username,
      password: password
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});
