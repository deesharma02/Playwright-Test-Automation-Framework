export type EnvironmentName = "dev" | "qa" | "uat";

export type EnvironmentConfig = {
    env: EnvironmentName;
    baseURL: string;
    apiURL: string;
    appPath: string;
    username: string;
    password: string;
    searchProduct: string;
    address: AddressData;
};

export type AddressData = {
    // firstName: string;
    // lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
};

export const environmentNames: EnvironmentName[] = ["dev", "qa", "uat"];

export function getEnvironmentConfig(env: EnvironmentName): EnvironmentConfig {
    const defaults: Record<EnvironmentName, Omit<EnvironmentConfig, "env">> = {
        dev: {
            baseURL: "https://tutorialsninja.com",
            apiURL: "https://tutorialsninja.com/demo",
            appPath: "/demo/",
            username: "doe.john078@mail.com",
            password: "Test@12345",
            searchProduct: "HP LP3065",
            address: {
                // firstName: "John",
                // lastName: "Doe",
                company: "Test Company",
                address1: "123 Test Street",
                address2: "Suite 100",
                city: "Los Angeles",
                postcode: "90001",
                country: "United States",
                state: "California",
            },
        },
        qa: {
            baseURL: "https://tutorialsninja.com",
            apiURL: "https://tutorialsninja.com/demo",
            appPath: "/demo/",
            username: "doe.john078@mail.com",
            password: "Test@12345",
            searchProduct: "HP LP3065",
            address: {
                // firstName: "John",
                // lastName: "Doe",
                company: "Test Company",
                address1: "123 Test Street",
                address2: "Suite 100",
                city: "Los Angeles",
                postcode: "90001",
                country: "United States",
                state: "California",
            },
        },
        uat: {
            baseURL: "https://tutorialsninja.com",
            apiURL: "https://tutorialsninja.com/demo",
            appPath: "/demo/",
            username: "doe.john078@mail.com",
            password: "Test@12345",
            searchProduct: "HP LP3065",
            address: {
                // firstName: "John",
                // lastName: "Doe",
                company: "Test Company",
                address1: "123 Test Street",
                address2: "Suite 100",
                city: "Los Angeles",
                postcode: "90001",
                country: "United States",
                state: "California",
            },
        },
    };

    return {
        env,
        ...defaults[env],
        baseURL: process.env.BASE_URL || defaults[env].baseURL,
        apiURL: process.env.API_URL || defaults[env].apiURL,
        appPath: process.env.APP_PATH || defaults[env].appPath,
        username: process.env.APP_USERNAME || defaults[env].username,
        password: process.env.APP_PASSWORD || defaults[env].password,
        searchProduct: process.env.SEARCH_PRODUCT || defaults[env].searchProduct,
    };
}
