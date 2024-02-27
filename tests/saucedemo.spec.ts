import { test, expect, Page } from '@playwright/test';
import { SauceDemoPage } from '../pages/saucedemopage';
import { testData } from './testData';

test.describe("Sauce Demo Home Page", () => {
  async function sauceDemoHomeSetup(page: Page) {
    const sauceDemoPage = new SauceDemoPage(page);
    const { accountLogin } = testData.standardUser;
    
    await sauceDemoPage.loginToAccount(accountLogin)
    await expect(sauceDemoPage.productsHeader).toBeVisible();
  }
  test('Add backpack to cart and checkout', async({page}) => {
    const sauceDemoPage = new SauceDemoPage(page);
    await sauceDemoHomeSetup(page);
    await sauceDemoPage.addBackpackToCart();

    await expect(sauceDemoPage.shoppingCart).toHaveText('1');
    await expect(sauceDemoPage.itemBackpack).toBeVisible();

    await sauceDemoPage.clickCheckout();
    await sauceDemoPage.finishCheckout();

  })
})