import {Page,Locator,expect} from "@playwright/test"
import { BrowserUtilities } from "../utilities/BrowserUtilities";

export class MyAccountPage extends BrowserUtilities {

    private readonly LogoutButtonLocator: Locator;
    private readonly verifyAccountLogoutLocator: Locator;
    private readonly continueButtonLocator: Locator;
    private readonly myAccountLocator: Locator;
    private readonly loginLinkLocator: Locator;
    private readonly registerLinkLocator: Locator;
    private readonly goToHomePageButtonLocator: Locator;
    private readonly addressBookLocator: Locator;
    private readonly orderHistoryLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.LogoutButtonLocator = page.getByRole('link', { name: 'Logout' });
        this.verifyAccountLogoutLocator = page.getByRole('heading', { name: 'Account Logout' });
        this.continueButtonLocator = page.getByRole('link', { name: 'Continue' });
        this.myAccountLocator = page.getByTitle("My Account");
        this.loginLinkLocator = page.getByRole("link", { name: "Login" });
        this.registerLinkLocator = page.getByRole("link", { name: "Register" });
        this.goToHomePageButtonLocator = page.getByRole('listitem').filter({ hasText: /^$/ });
        this.addressBookLocator = page.getByRole('link', { name: 'Address Book', exact: true });
        this.orderHistoryLocator = page.getByRole("link", { name: "Order History" }).first();
    }

    async clickOnLogout(): Promise<void> {
        await this.click(this.LogoutButtonLocator);
    }

    async expectLogoutSuccess(): Promise<void> {
        const message = await this.verifyAccountLogoutLocator.textContent();
        expect(message).toBe("Account Logout");
    }

    async clickOnContinue(): Promise<void> {
        await this.click(this.continueButtonLocator);
    }

    async clickOnHomePageIcon(): Promise<void> {
        await this.click(this.goToHomePageButtonLocator);
    }

    async clickOnAddressBook(): Promise<void> {
        await this.click(this.addressBookLocator);
    }

    async clickOnOrderHistory(): Promise<void> {
        await this.click(this.orderHistoryLocator);
    }



    async expectHomePageVisibleAndUserLoggedOut(): Promise<void> {
        await this.expectPageToHaveUrl(/route=common\/home/);
        await this.click(this.myAccountLocator);
        await this.expectElementToBeVisible(this.loginLinkLocator);
        await this.expectElementToBeVisible(this.registerLinkLocator);
        await expect(this.LogoutButtonLocator).toBeHidden();
    }



}
