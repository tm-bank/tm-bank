import path from "node:path"
import Express from "express";
import { config } from "dotenv"

import { makeDenylistMiddleware } from "./denylist.js";
import { emit } from "./emit.js";
import { cli } from "./cli.js";
import { db } from "./db.js";

config()

const PORT = process.env.PORT;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const DENYLIST = process.env.DENYLIST;
const DATA_DIR = process.env.DATA_DIR;

if (PORT === undefined) {
    cli.logError("PORT must be specified in .env");
    process.exit(1);
}

if (WEBHOOK_URL === undefined) {
    cli.logError("PORT must be specified in .env");
    process.exit(1);
}

if (DENYLIST === undefined) {
    cli.logError("DENYLIST must be specified in .env");
    process.exit(1);
}

if (DATA_DIR === undefined) {
    cli.logError("DATA_DIR must be specified in .env");
    process.exit(1);
}

const PRODUCTION = process.env.NODE_ENV === "production";

cli.logLabel("info", `server running in ${PRODUCTION ? "production" : "development"} mode.`)

const app = Express();

app.use(Express.json());
app.use(makeDenylistMiddleware(DENYLIST.length !== 0 ? DENYLIST.split(",") : []));

const MAP_DATA_PATH = path.join(DATA_DIR, "maps.db");

if (!db.fileExists(MAP_DATA_PATH)) {
    db.writeJSON(MAP_DATA_PATH, "[]");
}

const MAP_DATA = db.readJSON(MAP_DATA_PATH);

app.listen(PORT, (err) => {
    if (err) {
        cli.logError(`Failed to start server: ${err.message}`);
        process.exit(1);
    } else {
        cli.logLabel("info", `started server on port ${PORT}`, true);
        emit.emitServerLog("ServerStart", ``, `started server on port ${PORT}`)
    }
})