import crypto from "crypto"

export namespace db {
    export type KeyPair = { iv: string, key: string };

    export function encryptData(keys: KeyPair, data: string) {
        const cipher = crypto.createCipheriv("aes-256-cbc", keys.key, keys.iv);
        return Buffer.from(cipher.update(data, 'utf8', 'base64')).toString("base64");
    }

    export function decryptData(keys: KeyPair, data: string) {
        const buffer = Buffer.from(data, 'base64');
        const decipher = crypto.createDecipheriv("aes-256-cbc", keys.key, keys.iv);
        return (
            decipher.update(buffer.toString('utf8'), 'hex', 'utf8') +
            decipher.final('utf8')
        )
    }
}