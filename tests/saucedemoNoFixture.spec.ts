import { test, expect, Page } from '@playwright/test';
import { testData } from './testData';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { YourCartPage } from '../pages/yourCart.page';
import { CheckoutInfo } from '../pages/checkoutInfo.page';
import { CheckoutOverview } from '../pages/checkoutOverview.page';
import { LogoutPage } from '../pages/logout.page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
    const { accountLogin } = testData.standardUser;
    await loginPage.loginToAccount(accountLogin)
});

test.describe("Sauce Demo Home Page", () => {
  test('User can add one item to shopping cart', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(inventoryPage.backpack);
    await expect(inventoryPage.shoppingCart).toHaveText("1");
  })

  test('User can add and remove one item from shopping cart', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(inventoryPage.backpack);
    await inventoryPage.removeItemFromCart(inventoryPage.backpack);
    await expect(inventoryPage.shoppingCart).toBeEmpty();
  })

  test('User can add all items to cart', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addAllItemsToCart();
    await inventoryPage.shoppingCart.scrollIntoViewIfNeeded()
    await expect(inventoryPage.shoppingCart).toHaveText('6');
  })

  test('User can add all items and remove all items from cart', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addAllItemsToCart();
    await inventoryPage.removeAllItemsFromCart();
    await expect(inventoryPage.shoppingCart).toBeEmpty();
  })

  test('User can add two items and checkout', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(inventoryPage.backpack);
    await inventoryPage.addItemToCart(inventoryPage.bikelight);
    await inventoryPage.shoppingCart.click();
    const yourCartPage = new YourCartPage(page);
    await yourCartPage.checkoutBtn.click();
    const checkoutInfo = new CheckoutInfo(page);
    await checkoutInfo.fillCustomerDetails("Sam", "Smith", "12345")
    const checkoutOverview = new CheckoutOverview(page);
    await checkoutOverview.finishBtn.click();
  })
})

test.afterEach(async ({ page }) => {
  const logoutPage = new LogoutPage(page);
  await logoutPage.logout()
});