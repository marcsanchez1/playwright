import { test, expect } from "@playwright/test"

test.describe.only('Filter transactions and verify its content', () => {
  test.beforeEach(async ( {page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'username')
    await page.type('#user_password', 'password')
    await page.click('text = Sign in')
    await page.goto('http://zero.webappsecurity.com/bank/account-activity.html')
  })

  test.afterEach(async ( {page}) => {
    await page.close();
  })

  test('Verify the Show Transactions page displays', async ( {page}) => {
    await expect(page).toHaveTitle('Zero - Account Activity')
    const pageHeaderLocator = await page.locator('h2.board-header')
    const pageHeaderText = 'Show Transactions'

    await expect.soft(pageHeaderLocator).toHaveText(pageHeaderText)

    const accountDropdown = await page.locator('#aa_accountId')
    // await page.selectOption('#aa_accountId', 'Checking')

    const accountDropDownOptions = await page.locator('#aa_accountId > option')
    const allOptions = await accountDropDownOptions.allTextContents()
    
    
    // Iterate through all options using a for loop
    /* for (const option of allOptions) {
      const optionText = await option
      if (optionText === 'Loan') {
        await page.selectOption('#aa_accountId', option)
        break;
      }
    } */
    
    const account = (selection, assertion) => {
      allOptions.forEach(async (optionText) => {
        await expect(allOptions).toHaveLength(6)
        const tableLocator = await page.locator('#all_transactions_for_account')
        if (optionText === selection) {
          await page.selectOption('#aa_accountId', optionText)
          await expect(tableLocator).toContainText(assertion)
        }
      })
    }

    account('Savings', 'ONLINE TRANSFER REF #UKKSDRQG6L')
    await page.waitForTimeout(150)
    account('Checking', 'CHECK DEPOSIT')
    await page.waitForTimeout(150)
    account('Credit Card', 'No results')
    await page.waitForTimeout(150)
    account('Loan', 'RENT')
    await page.waitForTimeout(150)
    account('Brokerage', 'No results')
    await page.waitForTimeout(150)

    // Iterate though all options using a forEach
    /* allOptions.forEach(async (optionText) => {
      const tableLocator = await page.locator('#all_transactions_for_account')
      if (optionText === 'Savings') {
        await page.selectOption('#aa_accountId', optionText)
        await expect(tableLocator).toContainText('ONLINE TRANSFER REF #UKKSDRQG6L')
        }
    }) */

  });
});