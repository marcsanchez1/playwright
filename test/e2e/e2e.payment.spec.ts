import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('New Payment', () => {
  let homepage: HomePage
  let loginPage: LoginPage

  const username = "username"
  const password = "password"

  test.beforeEach(async ( {page} ) => {
    homepage = new HomePage(page)
    loginPage = new LoginPage(page)

    await homepage.visit()
    await homepage.clickOnSignin()
    await loginPage.login(
      username,
      password
    )
  })
  
  test.afterEach(async ( {page}) => {
    await page.close();
  })
  
  test.slow()
  test('Should send a new payment', async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')

    await page.selectOption('#sp_payee', 'Apple')
    await page.click('#sp_get_payee_details')
    await page.waitForSelector('#sp_payee_details')
    await page.selectOption('#sp_account', '6')
    await page.type('#sp_amount', '5000')
    await page.type('#sp_date', '2019-11-09')
    await page.type('#sp_description', 'Fake description')
    await page.click('input[type="submit"]')

    const message = page.locator('#alert_content > span')
    await expect(message).toBeVisible()
    await expect(message).toContainText('The payment was successfully submitted.')

    await page.waitForTimeout(2000)
  });
})