import {test, expect} from '@playwright/test'

test.describe('New Payment', () => {
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

  test('Should send a new payment', async ({page}) => {
    const pageHeader = page.locator('h2.board-header')
    await expect(pageHeader).toContainText('Make payments to your saved payees')

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