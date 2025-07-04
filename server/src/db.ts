import fs from "node:fs";
import { cli } from "./cli.js";
import { Map, UserData } from "./types/index.js";
import path from "node:path";
import { emit } from "./emit.js";

export namespace db {
    /*
        Reads the JSON file at a path.
    */
    export function readJSON(filePath: string) {
        try {
            const file = fs.readFileSync(filePath);

            const fileContents = Buffer.from(file.toString("binary"), "base64").toString("binary");
            return JSON.parse(fileContents);
        } catch (e) {
            cli.logError(`Failed to read JSON object: ${e}`, true);
        }
    }

    /*
       Writes to the JSON file at a path.
    */
    export function writeJSON(filePath: string, contents: string) {
        try {
            const encoded = Buffer.from(contents, "binary").toString("base64");
            fs.writeFileSync(filePath, encoded);
        } catch (e) {
            cli.logError(`Failed to write to JSON object: ${e}`, true);
        }
    }

    export class Database {
        public mapData: Map[] = [];
        public userData: UserData[] = [];

        private dataPath = process.env.DATA_DIR!;
        private mapPath = path.join(this.dataPath, "maps.db");
        private userPath = path.join(this.dataPath, "user.db");

        constructor() {
            this.upsertFiles();

            this.mapData = db.readJSON(this.mapPath);
            this.userData = db.readJSON(this.userPath);
        }

        public upsertFiles() {
            if (!db.fileExists(this.mapPath)) {
                cli.logLabel("db", "Instantiating maps.db");
                db.writeJSON(this.mapPath, "[]");
            }

            if (!db.fileExists(this.userPath)) {
                cli.logLabel("db", "Instantiating users.db");
                db.writeJSON(this.userPath, "[]");
            }
        }

        public saveToDisk() {
            cli.logLabel("db", "Saving snapshot");
            db.writeJSON(this.userPath, JSON.stringify(this.userData));
            db.writeJSON(this.mapPath, JSON.stringify(this.mapData));
        }

        public getUser(userId: number): UserData | undefined {
            return this.userData.find((u) => u.id === userId);
        }

        public upsertUser(userId: number, data: UserData) {
            cli.logLabel("db", `Upserting user ${userId} with data ${JSON.stringify(data)}`);

            if (this.getUser(userId) === undefined) {
                // Create new data
                this.userData.push(data);
                emit.emitUserSignup(data);
            } else {
                const index = this.userData.findIndex((u) => u.id === userId);

                this.userData[index] = data;
            }

            this.saveToDisk();
        }
    }

    export function fileExists(filePath: string) {
        return fs.existsSync(filePath);
    }
}