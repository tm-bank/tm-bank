import axios from "axios";
import { cli } from "./cli.js";
import { UserData } from "./types/index.js";

const PRODUCTION = process.env.NODE_ENV !== "production";

export namespace emit {
    export async function emitServerError(message: string, pingMaintainers?: boolean) {
        if (!PRODUCTION) return;

        const data = {
            "content": `${pingMaintainers ? "<@&1390029257518088192>" : ""}`,
            "tts": false,
            "embeds": [
                {
                    "id": 106588473,
                    "description": "A server error occurred.",
                    "fields": [
                        {
                            "id": 315320114,
                            "name": "message",
                            "value": message
                        }
                    ],
                    "title": "ServerError",
                    "color": 16711680
                }
            ],
            "components": [],
            "actions": {},
            "flags": 0
        }

        let req = await axios.post(process.env.WEBHOOK_URL as string, data);

        // Crude way of checking that the request succeeded
        if (req.status >= 400) {
            cli.logError(`Failed to emit discord webhook, status = \`${req.statusText}\`!`);
        }
    }

    export async function emitServerLog(title: string, description: string, message: string, color?: number, pingMaintainers?: boolean) {
        if (!PRODUCTION) return;

        const data = {
            "content": `${pingMaintainers ? "<@&1390029257518088192>" : ""}`,
            "tts": false,
            "embeds": [
                {
                    "id": 106588473,
                    "description": description,
                    "fields": [
                        {
                            "id": 315320114,
                            "name": "message",
                            "value": message
                        }
                    ],
                    "title": title,
                    "color": color ?? 16742912
                }
            ],
            "components": [],
            "actions": {},
            "flags": 0
        }

        let req = await axios.post(process.env.WEBHOOK_URL as string, data);

        // Crude way of checking that the request succeeded
        if (req.status >= 400) {
            cli.logError(`Failed to emit discord webhook, status = \`${req.statusText}\`!`);
        }
    }

    export async function emitUserSignup(user: UserData) {
        if (!PRODUCTION) return;

        const data = {
            "content": "A new user signed up!",
            "tts": false,
            "embeds": [
                {
                    "id": 106588473,
                    "description": user.display_name,
                    "fields": [],
                    "title": "User",
                    "color": 16711910,
                    "thumbnail": {
                        "url": `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar_url}`
                    }
                }
            ],
            "components": [],
            "actions": {},
            "flags": 0
        }

        let req = await axios.post(process.env.WEBHOOK_URL as string, data);

        // Crude way of checking that the request succeeded
        if (req.status >= 400) {
            cli.logError(`Failed to emit discord webhook, status = \`${req.statusText}\`!`);
        }
    }
}

