const localUrl = 'http://localhost';
const prodUrl = 'https://automationintesting.online';
const dockerUrl = 'http://rbp-proxy';

export function getUrl() {
  let environment = Cypress.env('ENV');
  if (environment == null) return prodUrl;
  else if (environment == 'prod') return prodUrl;
  else if (environment == 'local') return localUrl;
  else if (environment == 'docker') return dockerUrl;
}

export function getApiUrl() {
  let environment = Cypress.env('ENV');
  if (environment == null) return prodUrl;
  else if (environment == 'prod') return prodUrl;
  else if (environment == 'local') return localUrl;
  else if (environment == 'docker') return dockerUrl;
}
