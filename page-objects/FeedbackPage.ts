import { expect, Locator, Page } from "@playwright/test";

export class FeedbackPage {
  // Define selectors
  readonly page: Page
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly subjectInput: Locator
  readonly commentInput: Locator
  readonly clearButton: Locator
  readonly submitButton: Locator
  readonly feedbackTitle: Locator

  // Initialize selectors with constructors
  constructor(page: Page) {
    this.page = page
    this.nameInput = page.locator('#name')
    this.emailInput = page.locator('#email')
    this.subjectInput = page.locator('#subject')
    this.commentInput = page.locator('#comment')
    this.clearButton = page.locator("input[value='Clear']")
    this.submitButton = page.locator("input[type='submit']")
    this.feedbackTitle = page. locator('#feedback-title')
  }

  // Define test methods
  async fillForm(
    name: string,
    email: string,
    subject: string,
    comment: string,
  ) {
    await this.nameInput.type(name)
    await this.emailInput.type(email)
    await this.subjectInput.type(subject)
    await this.commentInput.type(subject)
  }

  async resetForm() {
    await this.clearButton.click()
  }

  async submitForm() {
    await this.submitButton.click()
  }

  async assertReset() {
    await expect(this.nameInput).toBeEmpty()
    await expect(this.commentInput).toBeEmpty()
  }

  async assertFeedbackFormSent() {
    await expect(this.feedbackTitle).toBeVisible()
  }
}