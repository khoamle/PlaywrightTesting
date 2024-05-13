import { type Locator, type Page } from '@playwright/test';
import { IUser } from '../tests/loginData';
import { BasePage } from './base.page';

export class LoginPage extends BasePage{
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByTestId("username")
    this.password = page.getByTestId("password")
    this.loginBtn = page.getByTestId("login-button")
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
  async loginToAccount2(username: string, password: string){
    await this.goto();
    await this.username.fill(username)
    await this.password.fill(password)
    await this.loginBtn.click();
  }
}