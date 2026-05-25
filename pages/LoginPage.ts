import { Locator, Page } from "@playwright/test";
import { BrowserUtilities } from "../utilities/BrowserUtilities";

export class LoginPage extends BrowserUtilities{
    private readonly emailAddressLocator:Locator;
    private readonly passwordLocator:Locator;
    private readonly loginButtonLocator:Locator;
    private readonly loginErrorLocator: Locator;

    constructor(page: Page){
        super(page);
        this.emailAddressLocator = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.passwordLocator = page.getByRole('textbox', { name: 'Password' });
        this.loginButtonLocator = page.getByRole('button', { name: 'Login' });
        this.loginErrorLocator = page.locator(".alert-danger");
    }

    async login(emailAddress: string, password: string): Promise<void> {
        await this.enterText(this.emailAddressLocator, emailAddress);
        await this.enterText(this.passwordLocator, password);
        await this.click(this.loginButtonLocator);
    }

    async expectLoginSuccess(): Promise<void> {
        await this.expectPageToHaveUrl(/route=account\/account/);
    }

    async expectLoginFailure(expectedMessage: string | RegExp): Promise<void> {
        await this.expectElementToHaveText(this.loginErrorLocator, expectedMessage);
    }
}
