import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit, BrowserType } from 'playwright';
import { TestWorld } from './world';
import fs from 'node:fs';
import path from 'node:path';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

setDefaultTimeout(Number(process.env.DEFAULT_TIMEOUT ?? 30000));

Before(async function (this: TestWorld) {
  const browserName = (process.env.BROWSER ?? 'chromium').toLowerCase();
  const browserTypes: Record<string, BrowserType> = { chromium, firefox, webkit };
  const browserType = browserTypes[browserName];
  if (!browserType) throw new Error(`Unsupported BROWSER="${browserName}". Use chromium, firefox or webkit.`);

  this.browser = await browserType.launch({ headless: (process.env.HEADLESS ?? 'true').toLowerCase() !== 'false' });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
  this.productsPage = new ProductsPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
});

After(async function (this: TestWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    fs.mkdirSync(path.resolve('screenshots'), { recursive: true });
    const safeName = scenario.pickle.name.replace(/[^a-z0-9-_]/gi, '_');
    const screenshotPath = path.resolve('screenshots', `${safeName}.png`);
    await this.page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => undefined);
    if (fs.existsSync(screenshotPath)) {
      this.attach(fs.readFileSync(screenshotPath), 'image/png');
    }
  }
  await this.context?.close();
  await this.browser?.close();
});