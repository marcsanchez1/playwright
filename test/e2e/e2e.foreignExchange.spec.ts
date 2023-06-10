import {test, expect} from '@playwright/test'

test.describe.only('New Payment', () => {
  test.beforeEach(async ( {page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text = Sign in')
    await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
    await expect(page).toHaveTitle('Zero - Pay Bills')
  })

  test.afterEach(async ( {page}) => {
    await page.close();
  })

  test('Foreign Currency Exchange', async ({page}) => {
    page.click("a[href='#ui-tabs-3']")
    await page.waitForSelector('#ui-tabs-3 h2.board-header')
    const header = await page.locator('#ui-tabs-3 h2.board-header')
    expect.soft(header).toBeVisible()
    expect.soft(header).toContainText("Purchase foreign currency cash")

    await page.selectOption('#pc_currency', 'JPY')
    // await expect(page.locator('#pc_currency')).toContain('Japan (yen)')
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