import { test as baseTest } from "@playwright/test";
import { envConfig } from "../config/environment";
import { EnvironmentConfig } from "../config/environments";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { SearchPage } from "../pages/SearchPage";
import { AddressPage } from "../pages/AddressPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { CheckOutPage } from "../pages/CheckOutPage";
import { OrderHistoryPage } from "../pages/OrderHistoryPage";
import { ProductReturnPage } from "../pages/ProductReturnPage";

type CustomFixtures = {
    appConfig: EnvironmentConfig;
    homePage: HomePage;
    registerPage: RegisterPage;
    loginPage : LoginPage;
    myAccountPage : MyAccountPage;
    searchPage: SearchPage;
    addressPage: AddressPage;
    productDetailPage: ProductDetailPage;
    shoppingCartPage: ShoppingCartPage;
    checkOutPage: CheckOutPage;
    orderHistoryPage: OrderHistoryPage;
    productReturnPage: ProductReturnPage;
};

export const test = baseTest.extend<CustomFixtures>({
    page: async ({ page }, use) => {
        await page.goto(envConfig.appPath);
        await use(page);
    },
    appConfig: async ({}, use) => {
        await use(envConfig);
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },
    searchPage: async ({ page }, use) => {
        await use(new SearchPage(page));
    },
    addressPage: async ({ page }, use) => {
        await use(new AddressPage(page));
    },
    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    },
    shoppingCartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    },
    checkOutPage: async ({ page }, use) => {
        await use(new CheckOutPage(page));
    },
    orderHistoryPage: async ({ page }, use) => {
        await use(new OrderHistoryPage(page));
    },
    productReturnPage: async ({ page }, use) => {
        await use(new ProductReturnPage(page));
    },
});

export { expect } from "@playwright/test";
