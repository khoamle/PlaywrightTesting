import { type Locator, type Page } from '@playwright/test';

export class CheckoutInfo {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly postalCodeField: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.postalCodeField = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
  }
  async fillCustomerDetails(firstName: string, lastName: string, postalCode: string ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
    await this.continueBtn.click();
  }
}