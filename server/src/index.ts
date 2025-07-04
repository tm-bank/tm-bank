import Express from "express";
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";

import { makeDenylistMiddleware } from "./denylist.js";
import { emit } from "./emit.js";
import { cli } from "./cli.js";
import { db } from "./db.js";

config()

//#region Environment 

const PORT = process.env.PORT;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const DENYLIST = process.env.DENYLIST;
const DATA_DIR = process.env.DATA_DIR;

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
const LOCAL_URI = process.env.LOCAL_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;

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

if (CLIENT_ID === undefined) {
    cli.logError("DISCORD_CLIENT_ID must be specified in .env");
    process.exit(1);
}


if (CLIENT_SECRET === undefined) {
    cli.logError("DISCORD_CLIENT_SECRET must be specified in .env");
    process.exit(1);
}


if (REDIRECT_URI === undefined) {
    cli.logError("DISCORD_REDIRECT_URI must be specified in .env");
    process.exit(1);
}

if (LOCAL_URI === undefined) {
    cli.logError("LOCAL_URI must be specified in .env");
    process.exit(1);
}

if (SESSION_SECRET === undefined) {
    cli.logError("SESSION_SECRET must be specified in .env");
    process.exit(1);
}


const PRODUCTION = process.env.NODE_ENV === "production";

cli.logLabel("info", `server running in ${PRODUCTION ? "production" : "development"} mode.`)

//#endregion

const database = new db.Database();

//#region Middleware

const app = Express();

app.use(cookieParser());
app.use(cors({
    credentials: true
}))
app.use(Express.json());
app.use(makeDenylistMiddleware(DENYLIST.length !== 0 ? DENYLIST.split(",") : []));

app.use((err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    cli.logError(`${err.message}`)
    emit.emitServerError(`An uncaught server error occurred: ${err.message}, ${err.stack !== undefined ? err.stack : ""}`, true);
    res.status(500).send("ServerError");
})


import auth from "./routes/auth.js";

app.use("/auth", auth(database));

//#endregion

const server = app.listen(PORT, (err) => {
    if (err) {
        cli.logError(`Failed to start server: ${err.message}`);
        process.exit(1);
    } else {
        cli.logLabel("info", `started server on port ${PORT}`, true);
        emit.emitServerLog("ServerStart", ``, `started server on port ${PORT}`)
    }
});

server.headersTimeout = 120000;
server.keepAliveTimeout = 120000;