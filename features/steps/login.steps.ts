import { Given, When, Then } from '@cucumber/cucumber';
import { TestWorld } from '../../support/world';
import { config } from '../../config/env';

Given('I am on the SauceDemo login page', async function (this: TestWorld) {
  await this.loginPage.open(config.baseUrl);
});

When('I log in with valid credentials', async function (this: TestWorld) {
  await this.loginPage.login('standard_user', 'secret_sauce');
});

When('I log in with username {string} and password {string}', async function (this: TestWorld, username: string, password: string) {
  await this.loginPage.login(username, password);
});

Then('I should see the login error message', async function (this: TestWorld) {
  await this.loginPage.expectLoginError();
});

Then('I should remain on the login page', async function (this: TestWorld) {
  await this.loginPage.expectLoginPage();
});