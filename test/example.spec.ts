import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../helpers'

test('Simple basic test',async ( {page} ) => {
  await page.goto('https://www.example.com')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
  await page.waitForTimeout(2000)
})

test('Clicking on elements', async({page}) => {
  await page.goto('http://zero.webappsecurity.com/index.html')
  const signInBtn = await page.locator('#signin_button')
  await expect(signInBtn).toContainText('Signin')
  await page.click('#signin_button')
  await page.click('text = Sign in')

  const errorMessage = await page.locator('.alert.alert-error')
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
});

test.describe('My first test suite', () => {
  test('Working with inputs @smoke', async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.type('#user_login', 'SomeUserName')
    await page.type('#user_password', 'SomePassword')
    await page.click('text = Sign in')
  
    const errorMessage = await page.locator('.alert.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  });
  
  test('Assertions @smoke', async ({page}) => {
    await page.goto('https://www.example.com')
    await expect(page).toHaveURL('https://www.example.com')
    await expect(page).toHaveTitle('Example Domain')
  
    const pageHeader = await page.locator('h1')
    await expect(pageHeader).toBeVisible()
    await expect(pageHeader).toHaveText('Example Domain')
    await expect(pageHeader).toHaveCount(1)
  
    const noElementVisible = await page.locator('h5')
    await expect(noElementVisible).not.toBeVisible()
  });
})

// To add tags just add '@tagName' to the test description. Then add --grep @tagName when running the test
// To skip test using tags run --grep-invert @tagName. It'll run all tests and skip one's with that tag

test.skip('Selectors', async ({page}) => {
  // Select by the text in an element, ie: a button
  await page.click('name = Some Text Here')

  // Select by CSS selector, ie: id, class, html element
  await page.click('button')
  await page.click('#id')
  await page.click('.class')

  // Only visible CSS Selectors
  await page.click('.submmit-button:visible')

  // Combinations
  await page.click('#id .class')

  // XPath
  await page.click('//button')
  
})

test.describe.parallel.only('Hooks', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('https://www.example.com')
  })

  test('Screenshots', async ({page}) => {
    // await page.goto('https://www.example.com')
    await page.screenshot({path: 'screeshots/screenshot.png', fullPage: true})
  })
  
  test('Single element Screenshots', async ({page}) => {
    // await page.goto('https://www.example.com')
    const element = await page.$('h1')
    await element.screenshot({path: 'screeshots/single-element-ss.png', })
  })
})

test('Custom Helpers', async ({page}) => {
  await loadHomepage(page)
  await assertTitle(page)
});

// Run project from config: npx playwright test --config=playwright.config.ts --project=webkit