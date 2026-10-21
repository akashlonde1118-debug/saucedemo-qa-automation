import { When, Then } from '@cucumber/cucumber';
import { TestWorld } from '../../support/world';

Then('I should see the products page', async function (this: TestWorld) {
  await this.productsPage.expectVisible();
});

When('I add {string} to the cart', async function (this: TestWorld, productName: string) {
  await this.productsPage.addProductToCart(productName);
});

Then('the cart badge should show {string}', async function (this: TestWorld, count: string) {
  await this.productsPage.expectCartBadge(count);
});

When('I open the cart and proceed to checkout', async function (this: TestWorld) {
  await this.productsPage.openCart();
  await this.cartPage.expectProduct('Sauce Labs Backpack');
  await this.cartPage.checkout();
});

When('I enter checkout details {string} {string} {string}', async function (this: TestWorld, firstName: string, lastName: string, postalCode: string) {
  await this.checkoutPage.enterDetails(firstName, lastName, postalCode);
});

When('I finish the purchase', async function (this: TestWorld) {
  await this.checkoutPage.finishPurchase();
});

Then('I should see the order confirmation', async function (this: TestWorld) {
  await this.checkoutPage.expectConfirmation();
});