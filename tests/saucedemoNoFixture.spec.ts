import { test, expect, Page } from '@playwright/test';
import { testData } from './testData';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { YourCartPage } from '../pages/yourCart.page';
import { CheckoutInfo } from '../pages/checkoutInfo.page';
import { CheckoutOverview } from '../pages/checkoutOverview.page';
import { LogoutPage } from '../pages/logout.page';
import { loginData } from './loginData';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const { accountLogin } = testData.standardUser;
  test.info().annotations.push({type: 'GIVEN', description: `I'm logged in as ${loginData.standardUser.username}` })
  await loginPage.loginToAccount(accountLogin)
  await expect (inventoryPage.productsHeader).toBeVisible();
});

test.describe("Sauce Demo Home Page", () => {
  test('User can add one item to shopping cart', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    await test.step('WHEN: I add one item to cart', async ()=> {
      await inventoryPage.addItemToCart(inventoryPage.backpack);
    });
    await test.step('THEN: I should see one item in cart', async ()=> {
      await expect(inventoryPage.shoppingCart).toHaveText("1");
    });
  })

  test('User can add and remove one item from shopping cart', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    await test.step('WHEN: I add one item to cart', async ()=> {
      await inventoryPage.addItemToCart(inventoryPage.backpack);
    });
    await test.step('AND: I remove one item to cart', async ()=> {
      await inventoryPage.removeItemFromCart(inventoryPage.backpack);
    });
    await test.step('THEN: I should see empty cart', async ()=> {
      await expect(inventoryPage.shoppingCart).toBeEmpty();
    });
  })

  test('User can add all items to cart', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    await test.step('WHEN: I add all items to cart', async ()=> {
      await inventoryPage.addAllItemsToCart();
    });
    await test.step('THEN: I should see six items in cart', async ()=> {
      await expect(inventoryPage.shoppingCart).toHaveText('6');
    });
  })

  test('User can add all items and remove all items from cart', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    await test.step('WHEN: I add all items to cart', async ()=> {
      await inventoryPage.addAllItemsToCart();
    });
    await test.step('AND: I remove all items to cart', async ()=> {
      await inventoryPage.removeAllItemsFromCart();
    });
    await test.step('THEN: I should see empty cart', async ()=> {
      await expect(inventoryPage.shoppingCart).toBeEmpty();
    });
  })

  test('User can add two items and checkout', async({page}) => {
    const inventoryPage = new InventoryPage(page);
    await test.step('WHEN: I add two items to cart', async ()=> {
      await inventoryPage.addItemToCart(inventoryPage.backpack);
      await inventoryPage.addItemToCart(inventoryPage.bikelight);
    });
    const yourCartPage = new YourCartPage(page);
    const checkoutInfo = new CheckoutInfo(page);
    const checkoutOverview = new CheckoutOverview(page);
    await test.step('THEN: I can checkout items in cart', async ()=> {
      await inventoryPage.shoppingCart.click();
      await yourCartPage.checkoutBtn.click();
      await checkoutInfo.fillCustomerDetails("Sam", "Smith", "12345")
      await checkoutOverview.finishBtn.click();
    });
  })
})

test.afterEach(async ({ page }) => {
  const logoutPage = new LogoutPage(page);
  const loginPage = new LoginPage(page);
  await logoutPage.logout()
  await expect (loginPage.loginBtn).toBeVisible();
});