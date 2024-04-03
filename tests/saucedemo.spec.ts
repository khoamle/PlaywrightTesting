import { test, expect, Page, selectors } from '@playwright/test';
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
    await sauceDemoPage.updateItemToCart(sauceDemoPage.backpack, "Add to Cart");
    await expect(sauceDemoPage.shoppingCart).toHaveText("1");
    await sauceDemoPage.shoppingCart.click();
    await sauceDemoPage.clickCheckout();
    await sauceDemoPage.finishCheckout();
  })

  test('Add one item to cart and remove', async({page}) => {
    const sauceDemoPage = new SauceDemoPage(page);
    await sauceDemoHomeSetup(page);
    await sauceDemoPage.updateItemToCart(sauceDemoPage.backpack, "Add to Cart");
    await expect(sauceDemoPage.shoppingCart).toHaveText("1");
    await sauceDemoPage.updateItemToCart(sauceDemoPage.backpack, "Remove");
    await expect(sauceDemoPage.shoppingCart).toBeEmpty();
  })

  test('Add all items to cart and remove all items', async({page}) => {
    const sauceDemoPage = new SauceDemoPage(page);
    await sauceDemoHomeSetup(page);
    await sauceDemoPage.updateAllItemsToCart(page, "Add to Cart")
    await expect(sauceDemoPage.shoppingCart).toHaveText("6");
    await sauceDemoPage.updateAllItemsToCart(page, "Remove")
    await expect(sauceDemoPage.shoppingCart).toBeEmpty();
  })

  test('Add two items to cart and checkout', async({page}) => {
    const sauceDemoPage = new SauceDemoPage(page);
    await sauceDemoHomeSetup(page);
    await sauceDemoPage.updateItemToCart(sauceDemoPage.backpack, "Add to Cart");
    await sauceDemoPage.updateItemToCart(sauceDemoPage.bikelight, "Add to Cart");
    await expect(sauceDemoPage.shoppingCart).toHaveText("2");
    await sauceDemoPage.shoppingCart.click();
    await sauceDemoPage.clickCheckout();
    await sauceDemoPage.finishCheckout();
  })
})

test.afterEach(async ({ page }) => {
  const sauceDemoPage = new SauceDemoPage(page);
  await sauceDemoPage.logout()
});