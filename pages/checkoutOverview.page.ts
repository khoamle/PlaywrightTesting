import { type Locator, type Page } from '@playwright/test';

export class CheckoutOverview {
  readonly page: Page;
  readonly finishBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishBtn = page.locator('[data-test="finish"]');
  }
}