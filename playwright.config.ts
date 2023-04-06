import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  timeout: 15000,
  retries: 0,
  use: {
    headless: true,
    viewport: {width: 1280, height: 720},
    actionTimeout: 150000,
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
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
