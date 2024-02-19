import { test, expect } from '@playwright/test';
const testData = JSON.parse(JSON.stringify(require('./testData.json')));

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(testData.user.name);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(testData.user.password);
  await page.locator('[data-test="password"]').press('Enter');
  await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
  await page.locator('a').filter({ hasText: '1' }).click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Sam');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('Smith');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('60611');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
});