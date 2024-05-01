import { selectors, type Locator, type Page } from '@playwright/test';

export class CheckoutOverview {
  readonly page: Page;
  readonly finishBtn: Locator;

  constructor(page: Page) {
    selectors.setTestIdAttribute("data-test")
    this.page = page;
    this.finishBtn = page.getByTestId("finish");
  }
}