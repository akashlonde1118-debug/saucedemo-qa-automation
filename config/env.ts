import 'dotenv/config';

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  browser: process.env.BROWSER ?? 'chromium',
  headless: (process.env.HEADLESS ?? 'true').toLowerCase() !== 'false',
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT ?? 10000)
};