const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsBuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
module.exports = defineConfig({
e2e: {
    async setupNodeEvents(on, config) {
    // implement node event listeners here
    const bundler = createBundler({
      plugins: [createEsBuildPlugin(config)],
      });

      on('file:preprocessor', bundler);
        await addCucumberPreprocessorPlugin(on, config);
        return config;
      },
      testIsolation: true,
      retries: {
        runMode: 1,
        openMode: 1,
      },
      defaultCommandTimeout: 40000,
      chromeWebSecurity: false,
      videoCompression: false,
      specPattern: '**/*.feature',
      env: {
          
      },

      viewportHeight: 700,
      viewportWidth: 1240,
      fileServerFolder: '.',
      supportFile: './cypress/support/e2e.js',
      videosFolder: './cypress/videos',
      screenshotsFolder: './cypress/screenshots',
      fixturesFolder: './cypress/fixtures',
      downloadsFolder: process.env.TEST_DOWNLOADS_FOLDER,
      experimentalMemoryManagement:true,
      numTestsKeptInMemory: 3,
      video:false,

      specPattern: 'cypress/e2e/features/*.feature'
  },

});