import { Page,Locator } from "@playwright/test";
import { BrowserUtilities } from "../utilities/BrowserUtilities";

export class ShoppingCartPage extends BrowserUtilities{

    private readonly checkoutButtonLocator: Locator;

    constructor(page:Page){
        super(page);
        this.checkoutButtonLocator = page.getByRole('link', { name: 'Checkout', exact: true });
    }

    async expectProductInCart(productName: string): Promise<void> {
        const productRow: Locator = this.page.locator(".table-responsive tbody tr").filter({ hasText: productName });

        await this.expectElementToBeVisible(productRow);
    }

    async clickOnCheckOut(): Promise<void> {
        await this.click(this.checkoutButtonLocator);
    }
}
