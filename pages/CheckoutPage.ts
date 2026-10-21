
import { Page, expect } from 'playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async enterDetails(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    console.log('Waiting for checkout information page...');

    await expect(
      this.page.locator('[data-test="firstName"]')
    ).toBeVisible({ timeout: 10000 });

    console.log('Entering first name...');
    await this.page.locator('[data-test="firstName"]').fill(firstName);

    console.log('Entering last name...');
    await this.page.locator('[data-test="lastName"]').fill(lastName);

    console.log('Entering postal code...');
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);

    console.log('Clicking Continue...');
    await this.page.locator('[data-test="continue"]').click();

    console.log('Continue clicked.');
  }

  async finishPurchase(): Promise<void> {
    await expect(
      this.page.getByText('Checkout: Overview')
    ).toBeVisible({ timeout: 10000 });

    await this.page.locator('[data-test="finish"]').click();
  }

  async expectConfirmation(): Promise<void> {
    await expect(
      this.page.getByText('Thank you for your order!')
    ).toBeVisible({ timeout: 10000 });

    await expect(
      this.page.getByText('Your order has been dispatched')
    ).toBeVisible();
  }
}
