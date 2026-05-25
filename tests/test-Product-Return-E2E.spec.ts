import { test, expect } from "../fixtures/CustomFixtures";
import { RegistrationDataProvider } from "../utils/RegistrationDataProvider";

const userData = RegistrationDataProvider.getRegistrationData()[0];

test("Return Product After Successful Purchase", async ({
    appConfig,
    homePage,
    registerPage,
    myAccountPage,
    searchPage,
    productDetailPage,
    shoppingCartPage,
    checkOutPage,
    orderHistoryPage,
    productReturnPage,
}) => {
    await homePage.clickOnMyAccount();
    await homePage.clickOnRegister();
    await registerPage.registerUser(userData);
    await registerPage.verifySuccessMessage();

    await myAccountPage.clickOnHomePageIcon();
    await homePage.searchProduct(appConfig.searchProduct);
    await homePage.clickOnSearch();
    await searchPage.expectProductInSearchResults(appConfig.searchProduct);
    await searchPage.clickOnAddToCartButton();

    await productDetailPage.expectProductInSearchResults(appConfig.searchProduct);
    await productDetailPage.selectDeliveryDate();
    await productDetailPage.enterQuantity();
    await productDetailPage.clickOnAddToCart();
    expect(await productDetailPage.isConfirmationMessageVisible()).toBeTruthy();

    await productDetailPage.clickOnShoppingCart();
    await shoppingCartPage.expectProductInCart(appConfig.searchProduct);
    await shoppingCartPage.clickOnCheckOut();
    await checkOutPage.completeCheckoutWithNewBillingAddress(appConfig.address, userData);
    await checkOutPage.expectOrderPlacedSuccessfully();

    await homePage.clickOnMyAccount();
    await myAccountPage.clickOnOrderHistory();
    await orderHistoryPage.openLatestOrder();
    await orderHistoryPage.returnProduct(appConfig.searchProduct);
    await productReturnPage.submitReturnRequest();
    await productReturnPage.expectReturnSubmittedSuccessfully();
});
