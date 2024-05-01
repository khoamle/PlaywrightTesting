import { test as base, expect } from '@playwright/test';
import { LoginPage } from './login.page';
import { LogoutPage } from './logout.page';
import { InventoryPage } from './inventory.page';
import { testData } from '../tests/testData';
import { YourCartPage } from './yourCart.page';
import { CheckoutInfo } from './checkoutInfo.page';
import { CheckoutOverview } from './checkoutOverview.page';

// Declare the types of your fixtures.
type MyFixtures = {
  loginPage: LoginPage;
  logoutPage: LogoutPage;
  inventoryPage: InventoryPage;
  yourCartPage: YourCartPage;
  checkoutInfo: CheckoutInfo;
  checkoutOverview: CheckoutOverview;
};

// Extend base test by providing "loginPage", "logoutPage", "inventoryPage", "yourCartPage", "checkoutInfo", "checkoutOverview".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new LoginPage(page);
    const { accountLogin } = testData.standardUser;
    await loginPage.loginToAccount(accountLogin)

    // Use the fixture value in the test.
    await use(loginPage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  yourCartPage: async ({ page }, use) => {
    const yourCartPage = new YourCartPage(page);
    await use(yourCartPage);
  },
  checkoutInfo: async ({ page }, use) => {
    const checkoutInfo = new CheckoutInfo(page);
    await use(checkoutInfo);
  },
  checkoutOverview: async ({ page }, use) => {
    const checkoutOverview = new CheckoutOverview(page);
    await use(checkoutOverview);
  },
  logoutPage: async ({ page }, use) => {
    const logoutPage = new LogoutPage(page);
    await logoutPage.logout()
  }
});
export { expect } from '@playwright/test';