import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    video: false,
    viewportWidth: 1366,
    viewportHeight: 768,
    retries: 1,
    setupNodeEvents(on, config) {

    },
  },
});
