import { expect, Page,Locator } from "@playwright/test";
import { BrowserUtilities } from "../utilities/BrowserUtilities";
import type { AddressData } from "../config/environments";
import type { RegisterUserData } from "./RegisterPage";

export class CheckOutPage extends BrowserUtilities{

    private readonly existingBillingAddressLocator: Locator;
    private readonly newBillingAddressLocator: Locator;
    private readonly billingFirstNameLocator: Locator;
    private readonly billingLastNameLocator: Locator;
    private readonly billingCompanyLocator: Locator;
    private readonly billingAddress1Locator: Locator;
    private readonly billingAddress2Locator: Locator;
    private readonly billingCityLocator: Locator;
    private readonly billingPostcodeLocator: Locator;
    private readonly billingCountryLocator: Locator;
    private readonly billingStateLocator: Locator;
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
        this.newBillingAddressLocator = page.locator("#collapse-payment-address input[name='payment_address'][value='new']");
        this.billingFirstNameLocator = page.locator("#input-payment-firstname");
        this.billingLastNameLocator = page.locator("#input-payment-lastname");
        this.billingCompanyLocator = page.locator("#input-payment-company");
        this.billingAddress1Locator = page.locator("#input-payment-address-1");
        this.billingAddress2Locator = page.locator("#input-payment-address-2");
        this.billingCityLocator = page.locator("#input-payment-city");
        this.billingPostcodeLocator = page.locator("#input-payment-postcode");
        this.billingCountryLocator = page.locator("#input-payment-country");
        this.billingStateLocator = page.locator("#input-payment-zone");
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

    async completeCheckoutWithNewBillingAddress(address: AddressData, userData: RegisterUserData): Promise<void> {
        if (await this.newBillingAddressLocator.count() > 0) {
            await this.check(this.newBillingAddressLocator);
        }

        await this.enterText(this.billingFirstNameLocator, userData.firstName);
        await this.enterText(this.billingLastNameLocator, userData.lastName);
        await this.enterText(this.billingCompanyLocator, address.company);
        await this.enterText(this.billingAddress1Locator, address.address1);
        await this.enterText(this.billingAddress2Locator, address.address2);
        await this.enterText(this.billingCityLocator, address.city);
        await this.enterText(this.billingPostcodeLocator, address.postcode);
        await this.selectByLabel(this.billingCountryLocator, address.country);
        await expect(this.billingStateLocator.locator("option", { hasText: address.state })).toHaveCount(1);
        await this.selectByLabel(this.billingStateLocator, address.state);
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
