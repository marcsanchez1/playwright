import { expect, Locator, Page } from "@playwright/test";

export class CurrencyPage {
  // Define selectors
  readonly page: Page
  readonly currencyTab: Locator
  readonly currencyTabHeader: Locator
  readonly currencyDropdown: Locator
  readonly sellRateMessage: Locator
  readonly amountInput: Locator
  readonly usdRadioButton: Locator
  readonly calculateButton: Locator
  readonly conversionRate: Locator
  readonly purchaseButton: Locator
  readonly alertMessage: Locator

  // Initialize selector using constructors
  constructor(page: Page) {
    this.page = page
    this.currencyTab = page.locator("a[href='#ui-tabs-3']")
    this.currencyTabHeader = page.locator('#ui-tabs-3 h2.board-header')
    this.currencyDropdown = page.locator('#pc_currency')
    this.sellRateMessage = page.locator('#sp_sell_rate')
    this.amountInput = page.locator('#pc_amount')
    this.usdRadioButton = page.locator('#pc_inDollars_true')
    this.calculateButton = page.locator('#pc_calculate_costs')
    this.conversionRate = page.locator('#pc_conversion_amount')
    this.purchaseButton = page.locator('#purchase_cash')
    this.alertMessage = page.locator('#alert_content')
  }

  // Define test methods
  async purchaseCurrencyCash() {
    await this.currencyTab.click()

    expect.soft(this.currencyTabHeader).toContainText('Purchase foreign currency cash')

    await this.currencyDropdown.selectOption('JPY')

    expect.soft(this.sellRateMessage).toContainText('1 yen (JPY) = 0.01244 U.S. dollar (USD)')

    await this.amountInput.type('500')

    await this.usdRadioButton.click()

    await this.calculateButton.click()

    expect.soft(this.conversionRate).toContainText('40192.93 yen (JPY) = 500.00 U.S. dollar (USD)')

    await this.purchaseButton.click()

    expect.soft(this.alertMessage).toContainText('Foreign currency cash was successfully purchased.')
    await this.page.waitForTimeout(2000)
  }
}