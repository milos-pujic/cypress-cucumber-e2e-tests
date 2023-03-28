export function getUrl() {
  let environment = Cypress.env('ENV');
  if (environment == null) return 'http://localhost';
  else if (environment == 'prod') return 'https://automationintesting.online';
  else if (environment == 'local') return 'http://localhost';
  else if (environment == 'docker') return 'http://rbp-proxy';
}

export function getApiUrl() {
  let environment = Cypress.env('ENV');
  if (environment == null) return 'http://localhost';
  else if (environment == 'prod') return 'https://automationintesting.online';
  else if (environment == 'local') return 'http://localhost';
  else if (environment == 'docker') return 'http://rbp-proxy';
}
