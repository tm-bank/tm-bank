import { cli } from "./cli.js";
import { config } from "dotenv"
import Express from "express";
import { emit } from "./emit.js";
import { makeDenylistMiddleware } from "./denylist.js";

config()

const PORT = process.env.PORT;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const DENYLIST = process.env.DENYLIST;

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


const app = Express();

app.use(Express.json());
app.use(makeDenylistMiddleware(DENYLIST.length !== 0 ? DENYLIST.split(",") : []));



app.listen(PORT, (err) => {
    if (err) {
        cli.logError(`Failed to start server: ${err.message}`);
        process.exit(1);
    } else {
        cli.logLabel("info", `started server on port ${PORT}`, true);
        emit.emitServerLog("ServerStart", ``, `started server on port ${PORT}`)
    }
})