import { type Locator, type Page } from '@playwright/test';
import { IUser } from '../tests/loginData';

export class SauceDemoPage {
  readonly backpack = 'Sauce Labs Backpack';
  readonly bikelight = 'Sauce Labs Bike Light';
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly productsHeader: Locator;
  readonly shoppingCart: Locator;
  readonly shoppingCartBadge: Locator;
  readonly redShirt: Locator;
  readonly allItems: Locator;
  readonly itemBackpack: Locator;
  readonly tshirt: Locator;
  readonly checkoutBtn: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly menu: Locator;
  readonly logoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-button"]');
    this.productsHeader = page.getByText('Products');
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.redShirt = page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]');
    this.itemBackpack = page.locator('#item_4_title_link');
    this.allItems = page.locator("[data-test='inventory-item']")
    this.tshirt = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.menu = page.getByRole('button', { name: 'Open Menu' })
    this.logoutBtn = page.locator('[data-test="logout-sidebar-link"]')
  }

  async updateItemToCart(item: string, option: "Add to Cart" | "Remove"){
    const selectItem = this.allItems.filter({hasText: item});
    const selectionButton = selectItem.getByRole("button", {name: option})
    await selectionButton.click()
  }

  async updateAllItemsToCart(page: Page, option: "Add to Cart" | "Remove" ) {
    const rows = await this.allItems.all();
    for (let index = 0; index < rows.length; index++) {
      await page.getByRole("button", {name: option}).first().click()
    }
  }

  async removeAllItemsFromCart(page: Page) {
    const rows = await this.allItems.all();
    for (let index = 0; index < rows.length; index++) {
      await page.getByRole("button", {name: "Remove"}).first().click()
    }
  }

  async clickCheckout() {
    await this.checkoutBtn.click();;
  }

  async finishCheckout() {
    await this.firstName.fill('Sam');
    await this.lastName.fill('Smith');
    await this.postalCode.fill('58373');
    await this.continueBtn.click();
    await this.finishBtn.click();
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async setCredentials(account: IUser) {
    await this.setUsername(account.username);
    await this.setPassword(account.password);
  }

  async setUsername(username: string) {
    await this.username.fill(username);
  }

  async setPassword(password: string) {
    await this.password.fill(password);
  }

  async loginToAccount(account: IUser){
    await this.goto();
    await this.setCredentials(account);
    await this.loginBtn.click();
  }

  async logout(){
    await this.menu.click();
    await this.logoutBtn.click();
  }
}