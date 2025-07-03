import { ipFilterMiddleware } from "express-ip-filter-middleware";
import { BlockList } from "node:net";

export function makeDenylistMiddleware(DENYLIST: string[]) {
    const deny = new BlockList()

    for (const ip in DENYLIST) {
        deny.addAddress(ip);
    }

    return ipFilterMiddleware({
        mode: "blacklist",
        deny,
    });
}