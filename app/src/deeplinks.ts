import { onOpenUrl } from '@tauri-apps/plugin-deep-link';
import { invoke } from "@tauri-apps/api/core";

export async function initializeDeepLinks(refetchUser: () => void) {
    await onOpenUrl((urls) => {
        console.log("deep link", urls);
        if (urls.length === 0) return;
        const noPrefixUrls = urls.map((u) => u.replace("tmb://", ""));

        if (noPrefixUrls[0].startsWith("auth/callback")) {
            const token = noPrefixUrls[0].replace("auth/callback?token=", "");
            console.log(token);
            invoke("store_auth", { token }).then(() => {
                refetchUser();
            });
        }

    })
}