import { test} from "../fixtures/CustomFixtures";

test("Search Product Test" , async ({appConfig,homePage,loginPage,myAccountPage,searchPage}) =>{
    await homePage.clickOnMyAccount();
    await homePage.clickOnLogin();
    await loginPage.login(appConfig.username, appConfig.password);
    await loginPage.expectLoginSuccess();

    await myAccountPage.clickOnHomePageIcon();
    await homePage.searchProduct(appConfig.searchProduct);
    await homePage.clickOnSearch();
    await searchPage.expectProductInSearchResults(appConfig.searchProduct);
})
