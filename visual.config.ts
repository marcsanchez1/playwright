import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  testDir: 'test/visual',
  reporter: [['list', { printSteps: true }]],
  use: {
    headless: true,
    viewport: {width: 1280, height: 720},
    actionTimeout: 15000,
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
