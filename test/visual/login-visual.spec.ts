import { test } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"

test.describe("Login page visual",  () => {
  let homepage: HomePage
  let loginpage: LoginPage

  test.beforeEach(async({page}) => {
    homepage = new HomePage(page)
    loginpage = new LoginPage(page)

    await homepage.visit()
    await homepage.clickOnSignin()
  })

  test('Screenshot Login Form', async ({page}) => {
    await loginpage.screenshotLoginPage()
  });

  test('Screenshot error message after invalid login', async({page}) => {
    await loginpage.login("username", "wrongpw")
    await loginpage.screenshotErrorMessage()
  });
})