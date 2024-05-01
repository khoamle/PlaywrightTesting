import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LogoutPage extends BasePage{
  readonly page: Page;
  readonly menu: Locator;
  readonly logoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.menu = page.getByRole('button', { name: 'Open Menu' })
    this.logoutBtn = page.getByTestId("logout-sidebar-link")
  }
  
  async logout(){
    await this.menu.click();
    await this.logoutBtn.click();
  }
}