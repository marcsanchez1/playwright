import {test, expect } from '@playwright/test'

test.describe('Feedback form', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#feedback')
  })
})