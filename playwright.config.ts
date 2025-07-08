//playwright.config.ts

import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {

  testDir: './tests',

  timeout: 150 * 1000,

  expect: {

    timeout: 40000

  },

  reporter: 'html',

  use: {

    actionTimeout: 0,

    trace: 'on-first-retry',

  },

};

export default config;