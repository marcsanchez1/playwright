import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { CurrencyPage } from '../../page-objects/CurrencyPage'

test.describe.only('New Payment', () => {
  let homepage: HomePage
  let loginPage: LoginPage
  let navbar: Navbar

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
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test.afterEach(async ( {page}) => {
    await page.close();
  })

  test.slow()
  test('Foreign Currency Exchange', async ({page}) => {
    navbar = new Navbar(page)
    let purchaseCurrency: CurrencyPage = new CurrencyPage(page)

    navbar.clickOnTab('Pay Bills')
    
    await expect(page).toHaveTitle('Zero - Pay Bills')
    await page.waitForTimeout(1000)

    await purchaseCurrency.purchaseCurrencyCash()
  });
})