# QA Automation Engineer Take-Home — SauceDemo

A small BDD automation framework built with **Cucumber.js + Playwright + TypeScript**, Page Object Model, environment-based configuration, failure screenshots and an optional MySQL utility.

## Scope and honest limitations

Implemented UI scenarios:
1. Happy path: login → add Sauce Labs Backpack → cart badge → checkout → order confirmation.
2. Negative path: invalid login → error message → remain on login page.

**Database note:** SauceDemo does not expose a database endpoint. The DB helper is a configurable integration example and is not called by the UI scenarios. Do not claim that a real database record was validated. To run DB assertions, use an authorized test database and adapt the example query to its schema.

## Prerequisites

- Node.js LTS and npm
- VS Code (recommended)
- Internet access for the SauceDemo test site

## Setup from scratch

1. Install Node.js LTS from https://nodejs.org/ and verify:
   ```bash
   node --version
   npm --version
   ```
2. Extract this ZIP, then open the `saucedemo-qa-automation` folder in VS Code.
3. In the VS Code terminal, install dependencies:
   ```bash
   npm install
   npx playwright install chromium
   ```
4. Create your local environment file:
   - Windows PowerShell: `Copy-Item .env.example .env`
   - macOS/Linux: `cp .env.example .env`
5. Keep `BASE_URL=https://www.saucedemo.com` and `HEADLESS=true` in `.env`.
6. Run the TypeScript check:
   ```bash
   npm run typecheck
   ```
7. Run all BDD scenarios:
   ```bash
   npm test
   ```
8. Run scenarios separately:
   ```bash
   npm run test:happy
   npm run test:negative
   ```
9. To watch the browser, set `HEADLESS=false` in `.env`, or run:
   ```bash
   npm run test:headed
   ```
10. If tests fail, inspect the terminal output and `screenshots/`. Cucumber JSON output is written to `reports/cucumber-report.json`.
11. Generate an HTML report:
   ```bash
   npm run report
   ```
   Open `reports/html/index.html` in a browser.

## Project structure

```text
saucedemo-qa-automation/
├── features/
│   ├── purchase.feature
│   ├── invalid-login.feature
│   └── steps/
│       ├── login.steps.ts
│       └── purchase.steps.ts
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── support/
│   ├── world.ts
│   ├── hooks.ts
│   └── db/
│       ├── connection.ts
│       └── orderValidation.example.ts
├── config/env.ts
├── testdata/checkout.json
├── scripts/pretty-report.js
├── .env.example
├── cucumber.js
├── package.json
└── tsconfig.json
```

## Framework design decisions

### Why this structure?
- `features/` contains business-readable Gherkin only.
- `features/steps/` maps Gherkin language to reusable actions; selectors do not live here.
- `pages/` centralizes locators and page actions in the Page Object Model.
- `support/` owns scenario lifecycle, browser/context setup, failure screenshots and DB helpers.
- `config/` centralizes environment settings.
- `testdata/` keeps sample data separate from automation logic.

### Locator strategy for “Sauce Labs Backpack”
Preferred: scope to the product card using its visible product name, then locate the card's `Add to cart` button by role. This avoids relying on the product's current list index or a long brittle XPath. Where the application exposes stable `data-test` attributes, use them for known controls.

Fallback strategy: use a verified `data-test` attribute for the product's add button if the site changes, or a CSS locator scoped to the product card. Avoid index-based selectors and absolute XPath.

### Wait strategy
Playwright's locator actions and assertions wait for elements to become actionable/meet the expected state. This framework avoids arbitrary fixed sleeps. Increase `DEFAULT_TIMEOUT` only when justified by observed application performance.

### Database integration design
- `DB_ENABLED` defaults to false.
- Connection credentials are read from environment variables, never hard-coded in source.
- `queryRows` allows parameterized `SELECT` statements only.
- `orderValidation.example.ts` demonstrates a parameterized query and a proposed assertion flow; its table/columns are illustrative and must be mapped to a real test schema.
- For eventual consistency, poll for a bounded duration with a clear timeout, use unique test records, and clean up only test-owned data.
- SauceDemo's public site does not give us DB access, so no database assertion is part of the live UI run.

### Scaling to 50+ scenarios
Add reusable page methods and step definitions, use tags such as `@smoke`/`@regression`, move credentials and test data to environment/fixtures, run independent scenarios in controlled parallel workers, and configure CI artifacts for reports/screenshots. Avoid sharing one browser context between scenarios.

### CI/CD
A practical next step is GitHub Actions: install Node, run `npm ci`, install Chromium, run `npm run typecheck` and `npm test`, then upload reports/screenshots as artifacts. Add secrets only for authorized environments.

## AI / Copilot disclosure

This starter was prepared with AI assistance. Review and understand every file before submission. Before finalizing, record which AI tools you actually used, what code they helped draft, what you personally changed, and why. Do not claim work you did not perform. Be ready to explain and modify locators, hooks, assertions, configuration and DB design during the technical discussion.

Suggested disclosure to personalize:
> AI assistance was used to draft parts of the initial framework and documentation. I reviewed and adapted the implementation, ran the scenarios locally, and can explain the framework decisions. The database integration is a configurable example only because SauceDemo does not expose a database for this assignment.

Only use this wording if it accurately describes your work.

## Final submission checklist

- [ ] `npm install` completes successfully.
- [ ] `npm run typecheck` passes.
- [ ] Both scenarios pass locally.
- [ ] No `.env`, password, token, `node_modules/`, or generated report is committed.
- [ ] README setup instructions are accurate for your machine.
- [ ] Record a 5–8 minute walkthrough: architecture, running tests, decisions, locator strategy, hooks/screenshots, DB limitation/design, and AI disclosure.
- [ ] Upload the video as an unlisted share link or include it if the employer's instructions permit.
- [ ] Push the repository to GitHub and submit the repository URL or ZIP as requested.

## Public test credentials

SauceDemo's standard sample account:
- Username: `standard_user`
- Password: `secret_sauce`

Use only on the public demo site, not for real accounts.

## Database Integration Design

The framework includes a database connection utility to demonstrate separation of database configuration, query execution, and validation logic.

Planned validation approach:
- Establish a database connection using environment-based configuration.
- Execute parameterized SQL queries.
- Validate expected database records and values.
- Handle database errors and close connections appropriately.
- Use isolated test data and cleanup where applicable.

**Limitation:** SauceDemo does not provide direct database access for this assignment. Therefore, live database validation against SauceDemo has not been performed. The database validation approach is documented as a design demonstration.

## AI / Copilot Usage Disclosure

AI-assisted tools were used to support parts of the automation development and troubleshooting process. The generated suggestions were reviewed and adapted to the project requirements.

The final implementation and design decisions are the responsibility of the author.

## Test Execution

Install dependencies:

npm install
npx playwright install chromium

Run TypeScript validation:

npm run typecheck

Run all BDD scenarios:

npm test

Run the negative login scenario:


npm run test:negative


Run the successful purchase scenario:

npm run test:happy


## Walkthrough Video

Video: https://drive.google.com/file/d/1Xo-D9q9RJk-B5jf-FQa0O6zGDbZ2z9kM/view?usp=sharing

The walkthrough covers project structure, BDD scenarios, Page Object Model, locator strategy, hooks, database integration design, and test execution.