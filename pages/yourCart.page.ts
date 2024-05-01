import { selectors, type Locator, type Page } from '@playwright/test';

export class YourCartPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    selectors.setTestIdAttribute("data-test")
    this.page = page;
    this.checkoutBtn = page.getByTestId("checkout");
  }
}