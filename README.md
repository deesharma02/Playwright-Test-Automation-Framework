# Playwright TypeScript Automation Framework

## Environment Configuration

The framework supports `dev`, `qa`, and `uat` environments. Select the environment with the `ENV` variable. If `ENV` is not provided, `qa` is used by default.

Environment files:

- `env/.env.dev`
- `env/.env.qa`
- `env/.env.uat`

Supported values:

```env
BASE_URL=https://tutorialsninja.com
API_URL=https://tutorialsninja.com/demo
APP_PATH=/demo/
APP_USERNAME=qa-user
APP_PASSWORD=qa-password
```

The selected values are loaded from `config/environment.ts` and used by `playwright.config.ts`.

## Run Tests

Use npm scripts for Windows, macOS, Linux, and CI:

```bash
npm run test:dev
npm run test:qa
npm run test:uat
```

Direct environment commands also work in Unix-style shells:

```bash
ENV=qa npx playwright test
ENV=uat npx playwright test
ENV=dev npx playwright test
```

Other useful commands:

```bash
npm test
npm run test:headed
npm run test:debug
```

## Data-Driven Testing

Test data is stored under `test-data/`.

Sample files:

- `test-data/registrationData.json`
- `test-data/registrationData.csv`
- `test-data/registrationData.xlsx`

Reusable readers are available in `utils/TestDataReader.ts`:

```ts
TestDataReader.readJson("test-data/registrationData.json");
TestDataReader.readCsv("test-data/registrationData.csv");
TestDataReader.readExcel("test-data/registrationData.xlsx");
```

The registration data provider combines all three formats in `utils/RegistrationDataProvider.ts`, and the registration test only drives the page steps in `tests/test-New-User-Registration.spec.ts`.

## Reporting

The framework generates:

- Playwright HTML report: `reports/html-report`
- JUnit report: `reports/junit-results.xml`
- Allure results: `allure-results`
- Allure HTML report: `allure-report`

Commands:

```bash
npm run report
npm run allure:generate
npm run allure:open
```

## Required Packages

The required packages are listed in `package.json`.

```bash
npm install
```

Key packages:

- `@playwright/test`
- `dotenv`
- `cross-env`
- `xlsx`
- `allure-playwright`
- `allure-commandline`
