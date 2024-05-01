import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutInfo extends BasePage {
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly postalCodeField: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameField = page.getByTestId("firstName")
    this.lastNameField = page.getByTestId("lastName")
    this.postalCodeField = page.getByTestId("postalCode")
    this.continueBtn = page.getByTestId("continue")
  }
  async fillCustomerDetails(firstName: string, lastName: string, postalCode: string ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
    await this.continueBtn.click();
  }
}