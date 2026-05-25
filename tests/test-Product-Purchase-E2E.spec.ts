import { test , expect} from "../fixtures/CustomFixtures";

test('Product Purchase E2E' , async ({appConfig, homePage, loginPage, searchPage, myAccountPage, productDetailPage, shoppingCartPage, checkOutPage}) =>{
    await homePage.clickOnMyAccount();
    await homePage.clickOnLogin();
    await loginPage.login(appConfig.username, appConfig.password);
    await loginPage.expectLoginSuccess();

    await myAccountPage.clickOnHomePageIcon();
    await homePage.searchProduct(appConfig.searchProduct);
    await homePage.clickOnSearch();
    await searchPage.expectProductInSearchResults(appConfig.searchProduct);
    await searchPage.clickOnAddToCartButton();

    await productDetailPage.expectProductInSearchResults(appConfig.searchProduct);
    await productDetailPage.selectDeliveryDate();
    await productDetailPage.enterQuantity();
    await productDetailPage.clickOnAddToCart();
    // const result:boolean = await productDetailPage.isConfirmationMessageVisible();
    expect(await productDetailPage.isConfirmationMessageVisible()).toBeTruthy();

    await productDetailPage.clickOnShoppingCart();
    await shoppingCartPage.expectProductInCart(appConfig.searchProduct);
    await shoppingCartPage.clickOnCheckOut();
    await checkOutPage.completeCheckoutWithExistingDetails();
    await checkOutPage.expectOrderPlacedSuccessfully();
})
