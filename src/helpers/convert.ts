export const stringToNumber = (value: string) => {
    return String(value).replace(/\D/g, "");
};
