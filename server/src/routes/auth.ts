import axios from "axios";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

export default function makeAuth(database: db.Database) {
    const router = Router();

    const CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
    const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
    const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI!;

    router.get("/discord/login", (req, res) => {
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: "code",
            scope: "identify email",
            prompt: "consent",
        });
        res.redirect(`https://discord.com/api/oauth2/authorize?${params}`);
    });

    router.get("/discord/callback", async (req, res) => {
        const code = req.query.code as string;
        if (!code) {
            res.status(400).send("No code provided");
            return;
        }

        try {
            const tokenRes = await axios.post(
                "https://discord.com/api/oauth2/token",
                new URLSearchParams({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    grant_type: "authorization_code",
                    code,
                    redirect_uri: REDIRECT_URI,
                    scope: "identify email",
                }),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );

            const accessToken = tokenRes.data.access_token;

            const userRes = await axios.get("https://discord.com/api/users/@me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const user = userRes.data;

            database.upsertUser(user.id, {
                id: user.id,
                display_name: user.global_name || user.username,
                avatar_url: user.avatar ?? "none",
                role: "Member",
                items: [],
                reports: [],
                votes: [],
            });


            const jwtToken = jwt.sign(
                {
                    id: user.id,
                    username: user.display_name,
                    avatar: user.avatar,
                    global_name: user.displayName,
                    admin: user.admin,
                },
                process.env.SESSION_SECRET!,
                { expiresIn: "7d" }
            );

            res.redirect(
                `${process.env.LOCAL_URI!}auth/callback?token=${jwtToken}`
            );
        } catch (err) {
            console.log(err);
            res.status(500).send("OAuth failed");
        }
    });

    return router;
}