# 5–8 minute walkthrough outline

1. **0:00–0:45 — Overview:** Explain that this is a BDD UI automation framework for SauceDemo using TypeScript, Cucumber and Playwright.
2. **0:45–1:45 — Folder structure:** Show feature files, step definitions, page objects, hooks, config and test data.
3. **1:45–2:45 — Run tests:** Run `npm test`; briefly show both scenarios and the output.
4. **2:45–3:45 — Locator strategy:** Explain scoping the Backpack product card by its name and using a role-based Add to cart button instead of index-based selectors.
5. **3:45–4:45 — Hooks and failure handling:** Show per-scenario browser/context setup, teardown and screenshot attachment on failure.
6. **4:45–5:45 — DB design:** Explain environment-based connection, parameterized SELECT query and why it is only a sample: SauceDemo has no exposed DB.
7. **5:45–6:45 — Quality and scaling:** Explain waits/assertions, tags, CI, test data isolation and how you'd scale to 50+ scenarios.
8. **6:45–7:15 — AI disclosure:** State which AI tools were actually used, what you reviewed/modified, and what you can explain.

Record your own screen and voice. Do not state that a test passed unless you ran it and saw it pass.
