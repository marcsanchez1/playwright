import {test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe('Feedback form', () => {
  let homepage: HomePage
  let feedbackPage: FeedbackPage

  const name = "Marc Sanchez"
  const email = "email@study.com"
  const subject = "Subject goes here"
  const comment = "Comment goes here"

  test.beforeEach(async ({page}) => {
    homepage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)

    await homepage.visit()
    await homepage.clickFeedbackLink()
  })

  test.afterEach(async ({page}) => {
    await page.close(); 
  })

  // Reset Feedback form
  test('Reset feedback form', async ({page}) => {

    // Fill Form
    await feedbackPage.fillForm(
      name,
      email,
      subject,
      comment
      )

    // Reset out form
    await feedbackPage.resetForm()

    // Assert form is empty after reset
    await feedbackPage.assertReset()
  });

  // Submitt Feedback form
  test('Submit feedback form', async ({page}) => {

    // Fill out form
    await feedbackPage.fillForm(
      name,
      email,
      subject,
      comment
    )

    // Submit the form
    await feedbackPage.submitForm()

    // Assert the sent message is visible
    await feedbackPage.assertFeedbackFormSent()

  });
})