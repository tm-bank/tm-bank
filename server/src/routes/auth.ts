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
                maps: [],
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

            res.set("Location",
                `${process.env.LOCAL_URI!}auth/callback?token=${jwtToken}`
            );
            res.status(302).send();
        } catch (err) {
            console.log(err);
            res.status(500).send("OAuth failed");
        }
    });


    router.post("/set-cookie", (req, res) => {
        const { token } = req.body;
        if (!token) {
            res.status(400).send("No token provided");
            return;
        }

        try {
            jwt.verify(token, process.env.SESSION_SECRET!);
            res.cookie("user", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            res.status(200).json({ message: "Cookie set" });
        } catch {
            res.status(401).send("Invalid token");
        }
    });

    router.get("/me", (req, res) => {
        const token = req.cookies.user;
        if (!token) {
            res.status(401).json({ error: "Not authenticated" });
            return;
        }
        try {
            const user = jwt.verify(token, process.env.SESSION_SECRET!);
            res.json(user);
        } catch {
            res.status(401).json({ error: "Invalid token" });
        }
    });


    return router;
}