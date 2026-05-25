import { expect, Locator, Page } from "@playwright/test";
import { BrowserUtilities } from "../utilities/BrowserUtilities";

export class ProductReturnPage extends BrowserUtilities {
    private readonly returnReasonLocator: Locator;
    private readonly productOpenedNoLocator: Locator;
    private readonly submitButtonLocator: Locator;
    private readonly successMessageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.returnReasonLocator = page.locator("input[name='return_reason_id']").first();
        this.productOpenedNoLocator = page.locator("input[name='opened'][value='0']");
        this.submitButtonLocator = page.getByRole("button", { name: "Submit" });
        this.successMessageLocator = page.locator("#content");
    }

    async submitReturnRequest(): Promise<void> {
        await this.check(this.returnReasonLocator);
        await this.check(this.productOpenedNoLocator);
        await this.click(this.submitButtonLocator);
    }

    async expectReturnSubmittedSuccessfully(): Promise<void> {
        await expect(this.successMessageLocator).toContainText("Thank you for submitting your return request");
    }
}
