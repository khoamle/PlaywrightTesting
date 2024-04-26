import { type Locator, type Page } from '@playwright/test';
import { IUser } from '../tests/loginData';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async setCredentials(account: IUser) {
    await this.setUsername(account.username);
    await this.setPassword(account.password);
  }

  async setUsername(username: string) {
    await this.username.fill(username);
  }

  async setPassword(password: string) {
    await this.password.fill(password);
  }

  async loginToAccount(account: IUser){
    await this.goto();
    await this.setCredentials(account);
    await this.loginBtn.click();
  }
}