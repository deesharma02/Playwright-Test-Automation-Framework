import { expect, Locator, Page } from "@playwright/test";
import { BrowserUtilities } from "../utilities/BrowserUtilities";

export type RegisterUserData = {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
    confirmPassword: string;
    acceptPrivacyPolicy?: boolean;
};

export class RegisterPage extends BrowserUtilities {
    private readonly firstNameLocator: Locator;
    private readonly lastNameLocator: Locator;
    private readonly emailLocator: Locator;
    private readonly telephoneLocator: Locator;
    private readonly passwordLocator: Locator;
    private readonly confirmPasswordLocator: Locator;
    private readonly privacyCheckBoxLocator: Locator;
    private readonly continueButtonLocator: Locator;
    private readonly successMessageLocator:Locator;


    constructor(page: Page) {
        super(page);
        this.firstNameLocator = page.getByRole('textbox', { name: '* First Name' });
        this.lastNameLocator = page.getByRole('textbox', { name: '* Last Name' });
        this.emailLocator = page.getByRole('textbox', { name: '* E-Mail' });
        this.telephoneLocator = page.getByRole('textbox', { name: '* Telephone' });
        this.passwordLocator = page.getByRole('textbox', { name: '* Password', exact: true });
        this.confirmPasswordLocator = page.getByRole('textbox', { name: '* Password Confirm' });
        this.privacyCheckBoxLocator = page.getByRole('checkbox');
        this.continueButtonLocator = page.getByRole('button', { name: 'Continue' });
        this.successMessageLocator = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
    }

    async registerUser(userData: RegisterUserData): Promise<void> {
        await this.enterText(this.firstNameLocator, userData.firstName);
        await this.enterText(this.lastNameLocator, userData.lastName);
        await this.enterText(this.emailLocator, userData.email);
        await this.enterText(this.telephoneLocator, userData.telephone);
        await this.enterText(this.passwordLocator, userData.password);
        await this.enterText(this.confirmPasswordLocator, userData.confirmPassword);

        if (userData.acceptPrivacyPolicy ?? true) {
            await this.check(this.privacyCheckBoxLocator);
        }

        await this.click(this.continueButtonLocator);
    }

    async verifySuccessMessage() : Promise<void> {
        const message = await this.successMessageLocator.textContent();
        expect(message).toBe("Your Account Has Been Created!");
    }

}
