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

  test('Should send a new payment', async ({page}) => {
    const pageHeader = page.locator('h2.board-header')
    await expect(pageHeader).toContainText('Make payments to your saved payees')

    // await page.selectOption('#sp_payee', 'Apple')
    const payeeOptions = await page.locator('#sp_payee > option').allTextContents();

    payeeOptions.forEach(async (option) => {
      expect(payeeOptions).toHaveLength(4)
      if(payeeOptions === "Apple") {
        await page.click('Apple')
        console.log(option)
        
      }
    })


    await page.waitForTimeout(2000)
  });
})