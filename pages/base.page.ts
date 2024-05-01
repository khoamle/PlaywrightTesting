import { selectors, type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    selectors.setTestIdAttribute("data-test")
    this.page = page;
  }
}