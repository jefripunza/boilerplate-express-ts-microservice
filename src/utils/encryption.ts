// reference : https://travistidwell.com/jsencrypt/demo/

import crypto from "crypto";

import { Server } from "@/config";

export const encode = (text: string) => {
    // AES256
    const cipher = crypto.createCipher("aes256", Server.secret_key);
    const layer1 = cipher.update(text, "utf8", "hex") + cipher.final("hex");

    // BASE64
    return Buffer.from(layer1).toString("base64"); // last result
};

export const decode = (encrypted: string) => {
    // BASE64
    const lastLayer = Buffer.from(encrypted, "base64").toString("ascii");

    try {
        // AES256
        const decipher = crypto.createDecipher("aes256", Server.secret_key);
        return (
            decipher.update(lastLayer, "hex", "utf8") + decipher.final("utf8")
        );
    } catch (error) {
        return false;
    }
};
