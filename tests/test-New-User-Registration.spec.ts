import { expect, test } from "../fixtures/CustomFixtures";
import { RegistrationDataProvider } from "../utils/RegistrationDataProvider";

for (const { testName, ...userData } of RegistrationDataProvider.getRegistrationData()) {
    test(testName, async ({ homePage, registerPage }) => {
        await homePage.clickOnMyAccount();
        await homePage.clickOnRegister();
        await registerPage.registerUser(userData);
        await registerPage.verifySuccessMessage();
    });
}
