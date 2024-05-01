import { test, expect } from '../pages/fixtures.page';

test.describe("Sauce Demo Home Page", () => {
  test('User can add one item to shopping cart', async({loginPage, inventoryPage}) => {
    await inventoryPage.addItemToCart(inventoryPage.backpack);
    await expect(inventoryPage.shoppingCart).toHaveText("1");
  })

  test('User can add and remove one item from shopping cart', async({loginPage, inventoryPage}) => {
    await inventoryPage.addItemToCart(inventoryPage.backpack);
    await inventoryPage.removeItemFromCart(inventoryPage.backpack);
    await expect(inventoryPage.shoppingCart).toBeEmpty();
  })

  test('User can add all items to cart', async({loginPage, inventoryPage}) => {
    await inventoryPage.addAllItemsToCart;
    await expect(inventoryPage.shoppingCart).toHaveText("6");
  })

  test('User can add all items and remove all items from cart', async({loginPage, inventoryPage}) => {
    await inventoryPage.addAllItemsToCart;
    await inventoryPage.removeAllItemsFromCart;
    await expect(inventoryPage.shoppingCart).toBeEmpty();
  })

  test('User can add two items and checkout', async({loginPage, inventoryPage, yourCartPage, checkoutInfo, checkoutOverview}) => {
    await inventoryPage.addItemToCart(inventoryPage.backpack);
    await inventoryPage.addItemToCart(inventoryPage.bikelight);
    await inventoryPage.shoppingCart.click();
    await yourCartPage.checkoutBtn.click();
    await checkoutInfo.fillCustomerDetails("Sam", "Smith", "12345")
    await checkoutOverview.finishBtn.click();
  })
})
