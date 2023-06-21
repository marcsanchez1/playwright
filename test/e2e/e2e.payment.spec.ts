import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { PaymentPage } from '../../page-objects/paymentPage'

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
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })
  
  test.afterEach(async ( {page}) => {
    await page.close();
  })
  
  test.slow()
  test('Should send a new payment', async ({page}) => {
    let navbar: Navbar = new Navbar(page)
    let paymentPage: PaymentPage = new PaymentPage(page)

    await navbar.clickOnTab('Pay Bills')

    await paymentPage.sendPayment(
      'Bank of America',
      'Savings',
      '5000',
      '2019-11-09')

    await paymentPage.successMessage()

  });
})