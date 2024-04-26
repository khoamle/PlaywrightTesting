import { type Locator, type Page } from '@playwright/test';

export class YourCartPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }
}