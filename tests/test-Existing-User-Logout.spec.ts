import {test} from "../fixtures/CustomFixtures";

test("Verify Logout Functionality" , async ({homePage , loginPage , myAccountPage , appConfig}) =>{
    await homePage.clickOnMyAccount();
    await homePage.clickOnLogin();
    await loginPage.login(appConfig.username, appConfig.password);
    await loginPage.expectLoginSuccess();
    await myAccountPage.clickOnLogout();
    await myAccountPage.expectLogoutSuccess();
    await myAccountPage.clickOnContinue();
    await myAccountPage.expectHomePageVisibleAndUserLoggedOut();
})
