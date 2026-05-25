import fs from "fs";
import path from "path";
import * as xlsx from "xlsx";

export class TestDataReader {
    static readJson<T>(filePath: string): T[] {
        const rawData = fs.readFileSync(this.resolvePath(filePath), "utf-8");
        const parsedData = JSON.parse(rawData);
        return Array.isArray(parsedData) ? parsedData : [parsedData];
    }

    static readCsv<T>(filePath: string): T[] {
        const rawData = fs.readFileSync(this.resolvePath(filePath), "utf-8").trim();
        const [headerLine, ...rows] = rawData.split(/\r?\n/);
        const headers = this.parseCsvLine(headerLine);

        return rows.map((row) => {
            const values = this.parseCsvLine(row);
            return headers.reduce((record, header, index) => {
                record[header] = values[index] ?? "";
                return record;
            }, {} as Record<string, string>) as T;
        });
    }

    static readExcel<T>(filePath: string, sheetName?: string): T[] {
        const workbook = xlsx.readFile(this.resolvePath(filePath));
        const worksheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
        return xlsx.utils.sheet_to_json<T>(worksheet, { defval: "" });
    }

    private static resolvePath(filePath: string): string {
        return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    }

    private static parseCsvLine(line: string): string[] {
        const values: string[] = [];
        let currentValue = "";
        let insideQuotes = false;

        for (const character of line) {
            if (character === '"') {
                insideQuotes = !insideQuotes;
            } else if (character === "," && !insideQuotes) {
                values.push(currentValue.trim());
                currentValue = "";
            } else {
                currentValue += character;
            }
        }

        values.push(currentValue.trim());
        return values;
    }
}
