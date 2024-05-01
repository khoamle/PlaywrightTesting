import { selectors, type Locator, type Page } from '@playwright/test';

export class LogoutPage {
  readonly page: Page;
  readonly menu: Locator;
  readonly logoutBtn: Locator;

  constructor(page: Page) {
    selectors.setTestIdAttribute("data-test")
    this.page = page;
    this.menu = page.getByRole('button', { name: 'Open Menu' })
    this.logoutBtn = page.getByTestId("logout-sidebar-link")
  }
  
  async logout(){
    await this.menu.click();
    await this.logoutBtn.click();
  }
}