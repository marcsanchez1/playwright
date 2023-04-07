import {test, expect} from "@playwright/test"

test.describe.parallel("Login / Logout Flow", () => {
  // Before hook
  test.beforeEach(async ({page}) => {
    await page.goto("http://zero.webappsecurity.com/")
  })

  test.afterEach(async ({page}) => {
    await page.close(); 
  })

  // Negative scenario
  test('Negative scenario for login', async ({page}) => {
    await page.click('#signin_button')
    await page.type('#user_login', 'invalidUerName')
    await page.type('#user_password', 'password')
    await page.click('text = Sign in')

    const errorMessage = await page.locator('.alert.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  });

  // Positive scenario
  test('Positive scenario for login + logout', async ({page}) => {
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    // await page.click('text = Sign in')
    await page.getByText('Sign in').click()

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    
    const accountSummaryTab = await page.locator('#account_summary_tab')
    await expect(accountSummaryTab).toBeVisible()

    await page.goto("http://zero.webappsecurity.com/logout.html")
    await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    
  });
})