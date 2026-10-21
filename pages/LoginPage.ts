import { Page, Locator } from 'playwright';
import { expect } from 'playwright/test';

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
  this.username = page.locator('#user-name');
  this.password = page.locator('#password');
  this.loginButton = page.locator('#login-button');
  this.errorMessage = page.locator('[data-test="error"]');
}

  async open(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
  }

  
async login(username: string, password: string): Promise<void> {
  console.log('URL:', this.page.url());
  console.log('Username count:', await this.username.count());
  console.log('Password count:', await this.password.count());
  console.log('Button count:', await this.loginButton.count());

  await this.username.fill(username, { timeout: 5000 });
  console.log('Username entered');

  await this.password.fill(password, { timeout: 5000 });
  console.log('Password entered');

  await this.loginButton.click({ timeout: 5000 });
  console.log('Login clicked');
}


  async expectLoginError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText('Username and password do not match');
  }

  async expectLoginPage(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
    await expect(this.page).toHaveURL(/saucedemo\.com\/?$/);
  }
}