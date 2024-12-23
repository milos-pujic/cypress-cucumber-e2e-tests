const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { allureCypress } = require('allure-cypress/reporter');
const cypressSplit = require('cypress-split');

async function setupNodeEvents(cypressOn, config) {
  const on = require('cypress-on-fix')(cypressOn);
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)]
    })
  );
  allureCypress(on, config, {
    resultsDir: 'cypress/reports/allure-results'
  });
  cypressSplit(on, config);
  config.defaultCommandTimeout = 4000;
  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: 'cypress-cucumber',
  viewportWidth: 1920,
  viewportHeight: 1080,
  trashAssetsBeforeRuns: false,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  screenshotOnRunFailure: true,
  video: true,
  retries: 1,
  defaultCommandTimeout: 4000,
  responseTimeout: 30000,
  pageLoadTimeout: 60000,
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    setupNodeEvents
  }
});
