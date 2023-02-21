const all_characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const alphabet_characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const otp_characters = "0123456789";

export const Alphabet = (length = 20) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += alphabet_characters.charAt(
            Math.floor(Math.random() * alphabet_characters.length),
        );
    }
    return result;
};

export const Text = (length = 20) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += all_characters.charAt(
            Math.floor(Math.random() * all_characters.length),
        );
    }
    return result;
};

export const OTP = (length = 4) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += otp_characters.charAt(
            Math.floor(Math.random() * otp_characters.length),
        );
    }
    return result;
};

export const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
