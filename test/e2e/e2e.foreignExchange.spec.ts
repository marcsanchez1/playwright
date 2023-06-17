import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.only('New Payment', () => {
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
    
    await page.waitForTimeout(1000)
  })

  test.afterEach(async ( {page}) => {
    await page.close();
  })

  test.slow()
  test('Foreign Currency Exchange', async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
    await expect(page).toHaveTitle('Zero - Pay Bills')
    await page.waitForTimeout(1000)
    page.click("a[href='#ui-tabs-3']")
    await page.waitForSelector('#ui-tabs-3 h2.board-header')
    const header = await page.locator('#ui-tabs-3 h2.board-header')
    expect.soft(header).toBeVisible()
    expect.soft(header).toContainText("Purchase foreign currency cash")

    await page.selectOption('#pc_currency', 'JPY')

    const rate = page.locator('#sp_sell_rate')
    expect.soft(rate).toContainText('1 yen (JPY) = 0.01244 U.S. dollar (USD)')

    await page.type('#pc_amount', '500')
    await page.click('#pc_inDollars_true')
    await page.click('#pc_calculate_costs')
    const conversionRate = page.locator('#pc_conversion_amount')
    await expect.soft(conversionRate).toContainText('40192.93 yen (JPY) = 500.00 U.S. dollar (USD)')
    await page.click('#purchase_cash')
    const message = page.locator('#alert_content')
    await expect.soft(message).toContainText('Foreign currency cash was successfully purchased.')
  });
})