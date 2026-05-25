import { expect, Page, Locator } from "@playwright/test";
import { BrowserUtilities } from "../utilities/BrowserUtilities";
import type { AddressData } from "../config/environments";
import type { RegisterUserData } from "./RegisterPage";

export class AddressPage extends BrowserUtilities {
    private readonly newAddressLocator: Locator;
    private readonly firstNameLocator: Locator;
    private readonly lastNameLocator: Locator;
    private readonly address1Locator: Locator;
    private readonly companyLocator: Locator;
    private readonly address2Locator: Locator;
    private readonly cityLocator: Locator;
    private readonly postcodeLocator: Locator;
    private readonly countryLocator: Locator;
    private readonly stateLocator: Locator;
    private readonly continueButtonLocator: Locator;
    private readonly successMessageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.newAddressLocator = page.getByRole('link', { name: 'New Address' });
        this.firstNameLocator = page.getByRole('textbox', { name: '* First Name' });
        this.lastNameLocator = page.getByRole('textbox', { name: '* Last Name' });
        this.address1Locator = page.getByRole('textbox', { name: '* Address' });
        this.companyLocator = page.getByRole('textbox', { name: 'Company' });
        this.address2Locator = page.getByRole('textbox', { name: 'Address 2' });
        this.cityLocator = page.getByRole('textbox', { name: '* City' });
        this.postcodeLocator = page.getByRole('textbox', { name: '* Post Code' });
        this.countryLocator = page.getByLabel('Country');
        this.stateLocator = page.getByLabel('Region / State');
        this.continueButtonLocator = page.getByRole('button', { name: 'Continue' });
        this.successMessageLocator = page.locator(".alert-success");
    }

    async clickOnNewAddress(): Promise<void> {
        await this.click(this.newAddressLocator);
    }

    async fillAddressDetails(address: AddressData, userData: RegisterUserData): Promise<void> {
        await this.enterText(this.firstNameLocator, userData.firstName);
        await this.enterText(this.lastNameLocator, userData.lastName);
        await this.enterText(this.companyLocator, address.company);
        await this.enterText(this.address1Locator, address.address1);
        await this.enterText(this.address2Locator, address.address2);
        await this.enterText(this.cityLocator, address.city);
        await this.enterText(this.postcodeLocator, address.postcode);
        await this.selectByLabel(this.countryLocator, address.country);
        await expect(this.stateLocator.locator("option", { hasText: address.state })).toHaveCount(1);
        await this.selectByLabel(this.stateLocator, address.state);
    }

    async saveAddress(): Promise<void> {
        await this.click(this.continueButtonLocator);
    }

    async expectAddressAddedSuccess(): Promise<void> {
        await expect(this.successMessageLocator).toContainText("Your address has been successfully added");
    }

    async expectSavedAddressVisible(address: AddressData, userData: RegisterUserData): Promise<void> {
        const addressLocator = this.getSavedAddressLocator(address, userData);

        await this.expectElementToBeVisible(addressLocator);
        await expect(addressLocator).toContainText(`${userData.firstName} ${userData.lastName}` );
        await expect(addressLocator).toContainText(address.company);
        await expect(addressLocator).toContainText(address.address1);
        await expect(addressLocator).toContainText(address.address2);
        await expect(addressLocator).toContainText(address.city);
        await expect(addressLocator).toContainText(address.postcode);
        await expect(addressLocator).toContainText(address.state);
        await expect(addressLocator).toContainText(address.country);
    }

    async deleteSavedAddress(address: AddressData, userData: RegisterUserData): Promise<void> {
        await this.click(this.getSavedAddressLocator(address, userData).getByRole("link", { name: "Delete" }));
    }

    async expectAddressDeletedSuccess(): Promise<void> {
        await expect(this.successMessageLocator).toContainText("Your address has been successfully deleted");
    }

    private getSavedAddressLocator(address: AddressData, userData: RegisterUserData): Locator {
        return this.page.locator(".table-responsive tr")
            .filter({ hasText: `${userData.firstName} ${userData.lastName}` })
            .filter({ hasText: address.address1 })
            .filter({ hasText: address.postcode })
            .last();
    }
}
