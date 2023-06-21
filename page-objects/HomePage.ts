import { Locator, Page } from "@playwright/test";

export class HomePage {
  // Define selectors
  readonly page: Page
  readonly signinButton: Locator
  readonly searchBox: Locator
  readonly feedbackLink: Locator

  // Initialize selectors using construct
  constructor(page: Page) {
    this.page = page
    this.signinButton = page.locator('#signin_button')
    this.searchBox = page.locator('#searchTerm')
    this.feedbackLink = page.locator('li#feedback')
  }

  // Define homepage methods
  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/index.html')
  }

  async clickFeedbackLink() {
    await this.feedbackLink.click()
  }

  async clickOnSignin() {
    await this.signinButton.click()
  }

  async searchFor(phrase: string) {
    await this.searchBox.type(phrase)
    await this.page.keyboard.press('Enter')
  }
}

