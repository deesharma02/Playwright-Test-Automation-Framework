# Repository Guidelines

## Project Structure & Module Organization

This repository is a TypeScript Playwright automation framework. Tests live in `tests/` and use custom fixtures from `fixtures/CustomFixtures.ts`. Page objects are in `pages/`, browser helpers are in `utilities/`, and data readers/providers are in `utils/`. Environment selection is handled by `config/environment.ts` and `config/environments.ts`, with files expected under `env/.env.dev`, `env/.env.qa`, and `env/.env.uat`. Test data is stored in `test-data/` as JSON, CSV, and XLSX. Generated artifacts include `reports/html-report`, `reports/junit-results.xml`, `allure-results/`, `allure-report/`, and `playwright-report/`; do not treat these as source code.

## Build, Test, and Development Commands

- `npm install`: install project dependencies.
- `npm test`: run the default Playwright suite.
- `npm run test:dev`, `npm run test:qa`, `npm run test:uat`: run tests with `ENV` set for the selected environment.
- `npm run test:headed`: run tests in headed browser mode for visual debugging.
- `npm run test:debug`: launch Playwright debug mode.
- `npm run report`: open the Playwright HTML report from `reports/html-report`.
- `npm run allure:generate`: rebuild `allure-report/` from `allure-results/`.
- `npm run allure:open`: open the generated Allure report.

## Coding Style & Naming Conventions

Use TypeScript with 4-space indentation, explicit return types on public async page-object methods, and descriptive class names such as `RegisterPage`. Keep tests in `*.spec.ts` files under `tests/`. Prefer role-based locators (`page.getByRole`) and encapsulate UI actions inside page objects instead of duplicating selectors in tests. Use double quotes for imports; match nearby quote style when editing existing files.

## Testing Guidelines

The framework uses `@playwright/test` with Chromium configured in `playwright.config.ts`. Add tests under `tests/` and keep titles behavior-focused, for example `Verify Existing User Login - Negative`. Use fixtures for page objects and environment config. Store reusable data in `test-data/` and load it through `utils/TestDataReader.ts` or provider classes. Before submitting changes, run the smallest relevant command first, then `npm test` when practical.

## Commit & Pull Request Guidelines

Git history is not available in this checkout, so no existing convention can be inferred. Use short, imperative commit subjects such as `Add login validation test`. Pull requests should include a concise summary, environments tested (`dev`, `qa`, or `uat`), commands run, linked issues if applicable, and report or screenshot evidence for UI-impacting changes.

## Security & Configuration Tips

Do not commit real credentials in `env/.env.*` files or test data. Keep generated reports and trace artifacts out of functional changes unless the change explicitly concerns reporting.
