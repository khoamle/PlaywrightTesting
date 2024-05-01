import { selectors, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class YourCartPage extends BasePage {
  readonly page: Page;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.checkoutBtn = page.getByTestId("checkout");
  }
}