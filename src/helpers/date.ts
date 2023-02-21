import moment from "moment-timezone";

export const addMinutes = (minutes: number) => {
    const timestamp =
        new Date(new Date().getTime() + minutes * 60000).getTime() / 1000;
    return moment
        .unix(timestamp)
        .tz("Asia/Jakarta")
        .format("YYYY-MM-DD HH:mm:ss");
};

export const nowWithFormat = () => {
    return moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
};

export const nowFormatFileName = () => {
    return moment().tz("Asia/Jakarta").format("YYYY-MM-DD_HH-mm-ss_SSS");
};

export const nowFormatLoggerFileName = () => {
    return moment().tz("Asia/Jakarta").format("YYYY-MM-DD");
};
export const nowFormatLoggerPrint = () => {
    return moment().tz("Asia/Jakarta").format("YYYY/MM/DD HH:mm:ss");
};
