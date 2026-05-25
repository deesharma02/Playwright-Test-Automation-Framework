import { Page,Locator } from "@playwright/test";
import { BrowserUtilities } from "../utilities/BrowserUtilities";

export class CheckOutPage extends BrowserUtilities{

    private readonly existingBillingAddressLocator: Locator;
    private readonly billingAddressContinueLocator: Locator;
    private readonly existingDeliveryAddressLocator: Locator;
    private readonly deliveryAddressContinueLocator: Locator;
    private readonly deliveryMethodContinueLocator: Locator;
    private readonly cashOnDeliveryLocator: Locator;
    private readonly termsAndConditionsLocator: Locator;
    private readonly paymentMethodContinueLocator: Locator;
    private readonly confirmOrderLocator: Locator;
    private readonly orderSuccessHeadingLocator: Locator;

    constructor(page:Page){
        super(page);
        this.existingBillingAddressLocator = page.locator("#collapse-payment-address input[name='payment_address'][value='existing']");
        this.billingAddressContinueLocator = page.locator("#button-payment-address");
        this.existingDeliveryAddressLocator = page.locator("#collapse-shipping-address input[name='shipping_address'][value='existing']");
        this.deliveryAddressContinueLocator = page.locator("#button-shipping-address");
        this.deliveryMethodContinueLocator = page.locator("#button-shipping-method");
        this.cashOnDeliveryLocator = page.locator("#collapse-payment-method input[name='payment_method'][value='cod']");
        this.termsAndConditionsLocator = page.locator("input[name='agree']");
        this.paymentMethodContinueLocator = page.locator("#button-payment-method");
        this.confirmOrderLocator = page.locator("#button-confirm");
        this.orderSuccessHeadingLocator = page.getByRole("heading", { name: "Your order has been placed!" });
    }

    async completeCheckoutWithExistingDetails(): Promise<void> {
        await this.check(this.existingBillingAddressLocator);
        await this.click(this.billingAddressContinueLocator);
        await this.check(this.existingDeliveryAddressLocator);
        await this.click(this.deliveryAddressContinueLocator);
        await this.click(this.deliveryMethodContinueLocator);
        await this.click(this.cashOnDeliveryLocator);
        await this.check(this.termsAndConditionsLocator);
        await this.click(this.paymentMethodContinueLocator);
        await this.click(this.confirmOrderLocator);
    }

    async expectOrderPlacedSuccessfully(): Promise<void> {
        await this.expectElementToBeVisible(this.orderSuccessHeadingLocator);
        await this.expectPageToHaveUrl(/route=checkout\/success/);
    }
}
