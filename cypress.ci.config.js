const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)]
    })
  );
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
  screenshotOnRunFailure: true,
  video: true,
  videoUploadOnPasses: true,
  retries: {
    runMode: 2,
    openMode: 0
  },
  defaultCommandTimeout: 4000,
  responseTimeout: 30000,
  pageLoadTimeout: 60000,
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    setupNodeEvents
  }
});
