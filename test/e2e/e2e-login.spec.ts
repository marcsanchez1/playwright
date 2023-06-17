import {test, expect} from "@playwright/test"
import { LoginPage } from "../../page-objects/LoginPage"
import { HomePage } from "../../page-objects/HomePage"

test.describe.parallel("Login / Logout Flow", () => {
  let loginPage: LoginPage
  let homepage: HomePage

  // Before hook
  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
    homepage = new HomePage(page)

    await homepage.visit()
  })

  test.afterEach(async ({page}) => {
    await page.close()
  })

  // Negative scenario
  test('Negative scenario for login', async ({page}) => {
    await homepage.clickOnSignin()
    await loginPage.login('invalidName', 'invalidPassword')
    await loginPage.assertErrorMessage()
  });

  // Positive scenario
  test('Positive scenario for login + logout', async ({page}) => {
    await homepage.clickOnSignin()

    await loginPage.login('username', 'password')

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')

    await page.waitForTimeout(2000)
    
    const accountSummaryTab = page.locator('#account_summary_tab')
    await expect.soft(accountSummaryTab).toBeVisible()
    
  });
})