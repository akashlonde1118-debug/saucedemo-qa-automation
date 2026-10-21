
import { Page, expect } from 'playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectProduct(productName: string): Promise<void> {
    console.log('Checking cart product:', productName);

    await expect(
      this.page.locator('.cart_item').filter({ hasText: productName })
    ).toBeVisible({ timeout: 10000 });

    console.log('Cart product found');
  }

  async checkout(): Promise<void> {
    console.log('Clicking checkout...');

    await this.page.locator('[data-test="checkout"]').click({
      timeout: 10000
    });

    console.log('Checkout clicked');
  }
}
