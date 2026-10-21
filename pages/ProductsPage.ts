import { Page, Locator } from 'playwright';
import { expect } from 'playwright/test';

export class ProductsPage {
  private readonly title: Locator;
  private readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByText('Products', { exact: true });
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async expectVisible(): Promise<void> {
    await expect(this.title).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await expect(product).toHaveCount(1);
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

 async expectCartBadge(count: string): Promise<void> {
  await expect(
    this.page.locator('.shopping_cart_badge')
  ).toHaveText(count);
}

  async openCart(): Promise<void> {
  console.log('Opening cart...');
  await this.page.locator('.shopping_cart_link').click();
  console.log('Cart opened');
}
}