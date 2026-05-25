import { Page,Locator } from "@playwright/test";
import { BrowserUtilities } from "../utilities/BrowserUtilities";

export class ProductDetailPage extends BrowserUtilities{
    private readonly deliveryDateLocator: Locator;
    private readonly quantityLocator: Locator;
    private readonly addToCartLocator: Locator;
    private readonly cnfMsg: Locator;
    private readonly shoppingCartLocator: Locator;

    // getByRole('heading', { name: 'HP LP3065' })

    constructor(page:Page){
        super(page);
        this.deliveryDateLocator = page.getByRole('textbox', { name: '* Delivery Date' });
        this.quantityLocator = page.getByRole('textbox', { name: 'Qty' });
        this.addToCartLocator = page.getByRole('button', { name: 'Add to Cart' });
        this.cnfMsg = page.locator('.alert.alert-success.alert-dismissible');
        this.shoppingCartLocator = page.getByRole('link', { name: ' Shopping Cart' });
    }

    async expectProductInSearchResults(productName: string): Promise<void> {
        const productLocator: Locator = this.page.getByRole('heading', { name: productName , exact:true});

        await this.expectElementToBeVisible(productLocator);
        await this.expectElementToHaveText(productLocator, productName);
    }

    async selectDeliveryDate(): Promise<void> {
        await this.enterText(this.deliveryDateLocator , "2026-12-01");
    }

    async enterQuantity(): Promise<void> {
        await this.enterText(this.quantityLocator , "1");
    }

    async clickOnAddToCart(): Promise<void> {
        await this.click(this.addToCartLocator);
    }

    async isConfirmationMessageVisible(): Promise<boolean> {
        try {
            await this.cnfMsg.waitFor({ state: "visible" });
            return await this.cnfMsg.isVisible();
        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }

    async clickOnShoppingCart(): Promise<void> {
        await this.click(this.shoppingCartLocator);
    }
    

}
