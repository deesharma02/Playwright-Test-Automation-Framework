import { Locator, Page, expect } from "@playwright/test";

export class BrowserUtilities {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    async goForward(): Promise<void> {
        await this.page.goForward();
    }

    async reloadPage(): Promise<void> {
        await this.page.reload();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("load");
    }

    async waitForNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState("networkidle");
    }

    async waitForElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "visible" });
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    async doubleClick(locator: Locator): Promise<void> {
        await locator.dblclick();
    }

    async rightClick(locator: Locator): Promise<void> {
        await locator.click({ button: "right" });
    }

    async hover(locator: Locator): Promise<void> {
        await locator.hover();
    }

    async enterText(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }

    async typeText(locator: Locator, value: string): Promise<void> {
        await locator.pressSequentially(value);
    }

    async clearText(locator: Locator): Promise<void> {
        await locator.clear();
    }

    async pressKey(locator: Locator, key: string): Promise<void> {
        await locator.press(key);
    }

    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() ?? "";
    }

    async getInputValue(locator: Locator): Promise<string> {
        return locator.inputValue();
    }

    async getAttribute(locator: Locator, attributeName: string): Promise<string | null> {
        return locator.getAttribute(attributeName);
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return locator.isVisible();
    }

    async isEnabled(locator: Locator): Promise<boolean> {
        return locator.isEnabled();
    }

    async isChecked(locator: Locator): Promise<boolean> {
        return locator.isChecked();
    }

    async check(locator: Locator): Promise<void> {
        await locator.check();
    }

    async uncheck(locator: Locator): Promise<void> {
        await locator.uncheck();
    }

    async selectByValue(locator: Locator, value: string): Promise<void> {
        await locator.selectOption(value);
    }

    async selectByLabel(locator: Locator, label: string): Promise<void> {
        await locator.selectOption({ label });
    }

    async uploadFile(locator: Locator, filePath: string | string[]): Promise<void> {
        await locator.setInputFiles(filePath);
    }

    async scrollIntoView(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    async takeScreenshot(path: string): Promise<void> {
        await this.page.screenshot({ path, fullPage: true });
    }

    async expectElementToBeVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    async expectElementToHaveText(locator: Locator, expectedText: string | RegExp): Promise<void> {
        await expect(locator).toHaveText(expectedText);
    }

    async expectPageToHaveUrl(expectedUrl: string | RegExp): Promise<void> {
        await expect(this.page).toHaveURL(expectedUrl);
    }
}
