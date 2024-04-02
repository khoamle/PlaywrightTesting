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
  test('Add one item to cart and checkout', async({page}) => {
    const sauceDemoPage = new SauceDemoPage(page);
    await sauceDemoHomeSetup(page);
    await sauceDemoPage.addItemToCart(sauceDemoPage.backpack);

    await expect(sauceDemoPage.shoppingCart).toHaveText("1");
    await sauceDemoPage.shoppingCart.click();

    await sauceDemoPage.clickCheckout();
    await sauceDemoPage.finishCheckout();
    await sauceDemoPage.logout();
  })

  test('Add two items to cart and checkout', async({page}) => {
    const sauceDemoPage = new SauceDemoPage(page);
    await sauceDemoHomeSetup(page);
    await sauceDemoPage.addItemToCart(sauceDemoPage.backpack);
    await sauceDemoPage.addItemToCart(sauceDemoPage.bikelight);
    await expect(sauceDemoPage.shoppingCart).toHaveText("2");

    await sauceDemoPage.shoppingCart.click();
    await sauceDemoPage.clickCheckout();
    await sauceDemoPage.finishCheckout();
    await sauceDemoPage.logout();
  })
})