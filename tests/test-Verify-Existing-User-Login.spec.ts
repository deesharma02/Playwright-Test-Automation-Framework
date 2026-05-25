import { test } from "../fixtures/CustomFixtures";

test("Verify Existing User Successful Login", async ({ homePage, loginPage, appConfig }) => {
    await homePage.clickOnMyAccount();
    await homePage.clickOnLogin();
    await loginPage.login(appConfig.username, appConfig.password);
    await loginPage.expectLoginSuccess();
});

test("Verify Existing User Login - Negative", async ({ homePage, loginPage, appConfig }) => {
    await homePage.clickOnMyAccount();
    await homePage.clickOnLogin();
    await loginPage.login(appConfig.username, "Invalid@12345");
    await loginPage.expectLoginFailure("Warning: No match for E-Mail Address and/or Password.");
});
