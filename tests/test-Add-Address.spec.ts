import { test } from "../fixtures/CustomFixtures";
import { RegistrationDataProvider } from "../utils/RegistrationDataProvider";

const userData = RegistrationDataProvider.getRegistrationData()[0];

test("Add Address For Newly Registered User", async ({ appConfig, homePage, registerPage, myAccountPage, addressPage }) => {
    await homePage.clickOnMyAccount();
    await homePage.clickOnRegister();
    await registerPage.registerUser(userData);
    await registerPage.verifySuccessMessage();

    await myAccountPage.clickOnContinue();
    await myAccountPage.clickOnAddressBook();
    await addressPage.clickOnNewAddress();
    await addressPage.fillAddressDetails(appConfig.address, userData);
    await addressPage.saveAddress();
    await addressPage.expectAddressAddedSuccess();
    await addressPage.expectSavedAddressVisible(appConfig.address, userData);
});
