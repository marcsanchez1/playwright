import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Transfer funds and make payments', () => {
  let homepage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ( {page}) => {
    homepage = new HomePage(page)
    loginPage = new LoginPage(page)

    const username = "username"
    const password = "password"

    await homepage.visit()
    await homepage.clickOnSignin()
    await loginPage.login(
      username,
      password
    )
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test.afterEach(async ( {page}) => {
    await page.close();
  })

  test.slow()
  test('Transfer funds',async ( {page}) => {
    const transferFundsPageHeader = await page.locator('h2.board-header')
    const transferVerifyText = 'Transfer Money & Make Payments - Verify'

    await page.click('#transfer_funds_tab')
    await expect(transferFundsPageHeader).toHaveText('Transfer Money & Make Payments')
    await page.selectOption('#tf_fromAccountId', '2')
    await page.selectOption('#tf_toAccountId', '3')
    await page.type('#tf_amount', '500')
    await page.type('#tf_description', 'Test message')
    await page.click('#btn_submit')

    await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/transfer-funds-verify.html')
    await expect(transferFundsPageHeader).toHaveText(transferVerifyText)
    await expect(page.locator('input#tf_fromAccountId')).toHaveAttribute('value', 'Checking')
    await expect(page.locator('input#tf_toAccountId')).toHaveAttribute('value', 'Savings')
    await page.click('#btn_submit')

    await expect(transferFundsPageHeader).toHaveText('Transfer Money & Make Payments - Confirm')
    const successMessageLocator = page.locator('.alert-success')
    const successMessage = 'You successfully submitted your transaction.'
    await expect(successMessageLocator).toHaveText(successMessage)
  })

})

