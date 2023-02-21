export const isArray = (value: any) => {
    return value && typeof value === "object" && Array.isArray(value);
};

export const isObject = (value: any) => {
    return value && typeof value === "object" && !Array.isArray(value);
};

export const isUndefined = (value: any) => {
    return typeof value === "undefined";
};

export const isEmail = (email: string) => {
    const match = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    return match ? true : false;
};

export const isAlphaNumeric = (value: any) => {
    const test = String(value).replace(/[^a-zA-Z0-9 ]/gi, "");
    return value.length === test.length;
};

export const isAlphabet = (value: any) => {
    const test = String(value).replace(/[^a-zA-Z ]/gi, "");
    return value.length === test.length;
};

export const isNumeric = (value: any) => {
    const test = String(value).replace(/[^0-9]/gi, "");
    return value.length === test.length;
};
