import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly menu: Locator;
  readonly productsHeader: Locator;
  readonly backpack = 'Sauce Labs Backpack';
  readonly bikelight = 'Sauce Labs Bike Light';
  readonly allItems: Locator;
  readonly shoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsHeader = page.getByText('Products');
    this.allItems = page.locator("[data-test='inventory-item']")
    this.menu = page.getByRole('button', { name: 'Open Menu' })
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
  }

  async addItemToCart(item: string){
    const selectItem = this.allItems.filter({hasText: item});
    const selectionButton = selectItem.getByRole("button", {name: "Add to Cart"})
    await selectionButton.click()
  }

  async removeItemFromCart(item: string){
    const selectItem = this.allItems.filter({hasText: item});
    const selectionButton = selectItem.getByRole("button", {name: "Remove"})
    await selectionButton.click()
  }

  async addAllItemsToCart(page: Page) {
    const rows = await this.allItems.all();
    for (let index = 0; index < rows.length; index++) {
      await page.getByRole("button", {name: "Add to Cart"}).first().click()
    }
  }

  async removeAllItemsFromCart(page: Page) {
    const rows = await this.allItems.all();
    for (let index = 0; index < rows.length; index++) {
      await page.getByRole("button", {name: "Remove"}).first().click()
    }
  }
}