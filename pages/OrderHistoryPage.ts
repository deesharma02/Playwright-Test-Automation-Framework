import { Locator, Page } from "@playwright/test";
import { BrowserUtilities } from "../utilities/BrowserUtilities";

export class OrderHistoryPage extends BrowserUtilities {
    private readonly latestOrderRowLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.latestOrderRowLocator = page.locator(".table-responsive tbody tr").first();
    }

    async openLatestOrder(): Promise<void> {
        await this.click(this.latestOrderRowLocator.locator("a[href*='route=account/order/info']").first());
    }

    async returnProduct(productName: string): Promise<void> {
        const productRow = this.page.locator(".table-responsive tbody tr").filter({ hasText: productName }).first();

        await this.click(productRow.locator("a[href*='route=account/return/add']").first());
    }
}
