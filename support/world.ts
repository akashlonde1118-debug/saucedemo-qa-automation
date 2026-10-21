import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export class TestWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  productsPage!: ProductsPage;
  cartPage!: CartPage;
  checkoutPage!: CheckoutPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}
setWorldConstructor(TestWorld);