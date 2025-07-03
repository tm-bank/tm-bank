import chalk from "chalk";
import { emit } from "./emit.js";

export namespace cli {
    export function logLabel(labelText: string, labelValue: string, emitToDiscord?: boolean) {
        console.log(`${chalk.bold(chalk.greenBright(labelText))}${chalk.bold(":")} ${labelValue}`);
        if (emitToDiscord) {
            console.log(`\temit requested...`)
           
        }
    }

    export function logError(message: string, emitToDiscord?: boolean) {
        console.log(`${chalk.bold(chalk.redBright("error"))}${chalk.bold(":")} ${message}`);
        if (emitToDiscord) {
            console.log(`\temit requested...`)
            emit.emitServerError(message, true)
        }
    }
}