import { Page, Locator } from "@playwright/test";
import { BrowserUtilities } from "../utilities/BrowserUtilities";

export class SearchPage extends BrowserUtilities {

    private readonly addToCartButtonLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButtonLocator = page.getByRole('button', { name: ' Add to Cart' });
    }

    async expectProductInSearchResults(productName: string): Promise<void> {
        const productLocator: Locator = this.page.locator(".product-thumb h4").getByRole("link", { name: productName, exact: true });

        await this.expectElementToBeVisible(productLocator);
        await this.expectElementToHaveText(productLocator, productName);
    }

    async clickOnAddToCartButton(): Promise<void> {
        await this.click(this.addToCartButtonLocator);
    }
}
