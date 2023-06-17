import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  timeout: 5000,
  retries: 0,
  testDir: 'test/e2e',
  // reporter: [['list', { printSteps: true }]],
  use: {
    headless: false,
    viewport: {width: 1280, height: 720},
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: "off",
    screenshot: "off",
  },

  projects: [
    {
      name: "chromium",
      use: {browserName: "chromium"},
    },
    {
      name: "firefox",
      use: {browserName: "firefox"},
    },
    {
      name: "webkit",
      use: {browserName: "webkit"},
    },
  ]
}

export default config
