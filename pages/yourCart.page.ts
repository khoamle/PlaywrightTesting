import { selectors, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class YourCartPage extends BasePage {
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutBtn = page.getByTestId("checkout");
  }
}