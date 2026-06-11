import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e-spec.ts',

  timeout: 30000,

  expect: {
    timeout: 5000,
  },

  reporter: [['html'], ['list']],

  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    timeout: 120000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
