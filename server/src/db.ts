import fs from "node:fs";
import { cli } from "./cli.js";

export namespace db {
    /*
        Reads the JSON file at a path.
    */
    export function readJSON(filePath: string) {
        try {
            const file = fs.readFileSync(filePath);

            const fileContents = file.toString('base64');
            console.log(fileContents);
        } catch (e) {
            cli.logError(`Failed to read JSON object: ${e}`, true);
        }
    }

    /*
       Writes to the JSON file at a path.
    */
    export function writeJSON(filePath: string, contents: string) {
        try {
            const encoded = Buffer.from(contents, 'binary').toString('base64');
            fs.writeFileSync(filePath, encoded);
        } catch (e) {
            cli.logError(`Failed to write to JSON object: ${e}`, true);
        }
    }
}