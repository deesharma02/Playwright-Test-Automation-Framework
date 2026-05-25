import { RegisterUserData } from "../pages/RegisterPage";
import { TestDataReader } from "./TestDataReader";

type RegistrationDataSource = "json" | "csv" | "excel";

type RawRegistrationData = Omit<RegisterUserData, "acceptPrivacyPolicy"> & {
    acceptPrivacyPolicy?: boolean | string;
};

export type RegistrationTestData = RegisterUserData & {
    testName: string;
};

export class RegistrationDataProvider {
    private static sequence = 0;

    static getRegistrationData(): RegistrationTestData[] {
        const runId = `${Date.now()}-${process.pid}-${this.sequence++}`;

        return [
            ...this.readData("test-data/registrationData.json", "json", runId),
            ...this.readData("test-data/registrationData.csv", "csv", runId),
            ...this.readData("test-data/registrationData.xlsx", "excel", runId),
        ];
    }

    private static readData(
        filePath: string,
        source: RegistrationDataSource,
        runId: string
    ): RegistrationTestData[] {
        const rows =
            source === "json"
                ? TestDataReader.readJson<RawRegistrationData>(filePath)
                : source === "csv"
                    ? TestDataReader.readCsv<RawRegistrationData>(filePath)
                    : TestDataReader.readExcel<RawRegistrationData>(filePath);

        return rows.map((row, index) => ({
            testName: `${source.toUpperCase()} Data Set ${index + 1}`,
            firstName: row.firstName,
            lastName: row.lastName,
            email: this.makeUniqueEmail(row.email, runId, source, index),
            telephone: row.telephone,
            password: row.password,
            confirmPassword: row.confirmPassword,
            acceptPrivacyPolicy: this.toBoolean(row.acceptPrivacyPolicy),
        }));
    }

    private static makeUniqueEmail(email: string, runId: string, source: RegistrationDataSource, index: number): string {
        const uniqueValue = `${source}-${runId}-${index + 1}`;
        return email.replace(/{{timestamp}}/g, uniqueValue);
    }

    private static toBoolean(value: boolean | string | undefined): boolean {
        if (typeof value === "boolean") {
            return value;
        }

        return String(value).trim().toLowerCase() === "true";
    }
}
