export function getUrl() {
  let environment = Cypress.env('ENV');
  if (environment == null) return 'https://automationintesting.online';
  else if (environment == 'production') return 'https://www.production-website.com';
  else if (environment == 'staging') return 'https://staging-website.com';
}

export function getApiUrl() {
  let environment = Cypress.env('ENV');
  if (environment == null) return 'https://automationintesting.online';
  else if (environment == 'production') return 'http://productionrestapi.adequateshop.com/api';
  else if (environment == 'staging') return 'http://stagingrestapi.adequateshop.com/api';
}
