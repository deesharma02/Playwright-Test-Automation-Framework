import { Locator, Page } from "@playwright/test";
import { BrowserUtilities } from "../utilities/BrowserUtilities";

export class HomePage extends BrowserUtilities {
    private readonly myAccountPageLocator: Locator;
    private readonly registerLinkLocator: Locator;
    private readonly loginLinkLocator: Locator;
    private readonly searchBoxLocator: Locator;
    private readonly searchButtonLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.myAccountPageLocator = page.getByTitle("My Account");
        this.registerLinkLocator = page.getByRole("link", { name: "Register" });
        this.loginLinkLocator = page.getByRole("link", { name: "Login" });
        this.searchBoxLocator = page.getByRole('textbox', { name: 'Search' });
        this.searchButtonLocator = page.locator('#search').getByRole('button');
    }

    async clickOnMyAccount(): Promise<void> {
        await this.click(this.myAccountPageLocator);
    }

    async clickOnRegister(): Promise<void> {
        await this.click(this.registerLinkLocator);
    }

    async clickOnLogin(): Promise<void> {
        await this.click(this.loginLinkLocator);
    }

    async searchProduct(productName: string): Promise<void> {
        await this.enterText(this.searchBoxLocator, productName);
    }

    async clickOnSearch() : Promise<void> {
        await this.click(this.searchButtonLocator);
    }
}
