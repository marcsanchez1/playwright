import { expect, Locator, Page } from "@playwright/test";

export class PaymentPage {
  readonly page: Page
  readonly payeeDropdown: Locator
  readonly payeeDetailsIcon: Locator
  readonly payeeDetails: Locator
  readonly accountDropdown: Locator
  readonly amount: Locator
  readonly dateInput: Locator
  readonly descriptionInput: Locator
  readonly submitPaymentButton: Locator
  readonly message: Locator

  constructor(page: Page) {
    this.page = page
    this.payeeDropdown = page.locator('#sp_payee')
    this.payeeDetailsIcon = page.locator('#sp_get_payee_details')
    this.payeeDetails = page.locator('#sp_payee_details')
    this.accountDropdown = page.locator('#sp_account')
    this.amount = page.locator('#sp_amount')
    this.dateInput = page.locator('#sp_date')
    this.descriptionInput = page.locator('#sp_description')
    this.submitPaymentButton = page.locator('input[type="submit"]')
    this.message = page.locator('#alert_content > span')
  }

  async selectPayee(company: string) {
    await this.payeeDropdown.selectOption(company)
  }

  async selectAccount(account: string) {
    await this.accountDropdown.selectOption(account)
  }

  async sendPayment(
    payee: string,
    account: string,
    amount: string,
    date: string,
  ){
    await this.selectPayee(payee)
    await this.payeeDetailsIcon.click()
    await expect(this.payeeDetails).toBeVisible()
    await this.selectAccount(account)
    await this.amount.type(amount)
    await this.dateInput.type(date)
    await this.descriptionInput.type('This is a desc')
    await this.submitPaymentButton.click()
  }

  async successMessage() {
    await expect(this.message).toContainText('The payment was successfully submitted.')
  }
}