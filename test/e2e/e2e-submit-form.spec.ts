import {test, expect } from '@playwright/test'

test.describe('Feedback form', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#feedback')
  })

  test.afterEach(async ({page}) => {
    await page.close(); 
  })

  // Reset Feedback form
  test('Reset feedback form', async ({page}) => {
    await page.type('#name', 'first Last')
    await page.type('#email', 'myEmail@test.com')
    await page.type('#subject', 'The Subject')
    await page.type('#comment', 'Your comment goes in here')
    await page.click("input[value='Clear']")

    const nameInput = await page.locator('#name')
    const commentInput = await page.locator('#comment')

    await expect(nameInput).toBeEmpty()
    await expect(commentInput).toBeEmpty()
  });

  // Submitt Feedback form
  test('Submit feedback form', async ({page}) => {
    await page.type('#name', 'first Last')
    await page.type('#email', 'myEmail@test.com')
    await page.type('#subject', 'The Subject')
    await page.type('#comment', 'Your comment goes in here')
    await page.click("input[value='Send Message']")

    await page.waitForSelector('#feedback-title')

  });
})