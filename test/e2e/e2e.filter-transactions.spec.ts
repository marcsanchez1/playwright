import { test, expect } from "@playwright/test"

test.describe('Filter transactions', () => {
  test.beforeEach(async ( {page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text = Sign in')
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test.afterEach(async ( {page}) => {
    await page.close();
  })
});