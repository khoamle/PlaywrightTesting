import { selectors, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage{
  readonly menu: Locator;
  readonly productsHeader: Locator;
  readonly backpack = 'Sauce Labs Backpack';
  readonly bikelight = 'Sauce Labs Bike Light';
  readonly allItems: Locator;
  readonly allItemsNoSetId: Locator;
  readonly shoppingCart: Locator;

  constructor(page: Page) {
    super(page);
    selectors.setTestIdAttribute("data-test");
    this.productsHeader = page.getByText('Products');
    this.allItems = page.getByTestId("inventory-item");
    this.menu = page.getByRole('button', { name: 'Open Menu' });
    this.shoppingCart = page.getByTestId("shopping-cart-link");
  }

  async addItemToCart(item: string){
    const selectItem = await this.allItems.filter({hasText: item});
    const selectionButton = selectItem.getByRole("button", {name: "Add to Cart"})
    await selectionButton.click()
  }

  async removeItemFromCart(item: string){
    const selectItem = await this.allItems.filter({hasText: item});
    const selectionButton = selectItem.getByRole("button", {name: "Remove"});
    await selectionButton.click();
  }

  async addAllItemsToCart() {
    for (const item of await this.allItems.all()){
      await item.getByRole("button", {name: "Add to cart"}).click();
    }
  }

  async removeAllItemsFromCart() {
    for (const item of await this.allItems.all()){
      await item.getByRole("button", {name: "Remove"}).click();
    }
  }
}