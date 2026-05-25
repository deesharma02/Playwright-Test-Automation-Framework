import * as path from "path";
import * as dotenv from "dotenv";
import { EnvironmentConfig, EnvironmentName, environmentNames, getEnvironmentConfig } from "./environments";

const selectedEnv = (process.env.ENV || "qa").toLowerCase() as EnvironmentName;

if (!environmentNames.includes(selectedEnv)) {
    throw new Error(`Invalid ENV value "${process.env.ENV}". Use dev, qa, or uat.`);
}

dotenv.config({ path: path.resolve(process.cwd(), "env", `.env.${selectedEnv}`), override: false, quiet: true });

export const envConfig: EnvironmentConfig = getEnvironmentConfig(selectedEnv);
