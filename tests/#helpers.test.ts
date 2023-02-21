import { createPromise, delay } from "../src/helpers/async";
import { stringToNumber } from "../src/helpers/convert";

import {
    addMinutes,
    nowFormatFileName,
    nowFormatLoggerFileName,
    nowFormatLoggerPrint,
    nowWithFormat,
} from "../src/helpers/date";

import {
    Alphabet,
    OTP,
    Text,
    randomIntFromInterval,
} from "../src/helpers/random";

import {
    isAlphaNumeric,
    isAlphabet,
    isNumeric,
    isUndefined,
    isArray,
    isObject,
    isEmail,
} from "../src/helpers/validation";

// ============================================================

function realNewDate() {
    return new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
    );
}

describe("Testing - All Helpers", () => {
    test("async : createPromise & delay", async () => {
        const random_number = randomIntFromInterval(4, 8);
        const received = await createPromise(
            [...Array(random_number).keys()],
            async (v, i) => {
                await delay(100);
                return i;
            },
        );
        expect(received.length).toBe(random_number);
    });

    test("convert : stringToNumber", async () => {
        const init_value = "20";
        const received = stringToNumber(init_value);
        expect(received).not.toBeNaN(); // numeric
    });

    test("date : addMinutes", async () => {
        const increase = 1;
        const now = realNewDate();
        const time = String(addMinutes(increase)).split(" ")[1];
        const received = parseInt(String(time).split(":")[1]);
        const expected = now.getMinutes() + increase;
        expect(received).toBe(expected);
    });

    test("date : nowFormatFileName", async () => {
        const part_format = String(nowFormatFileName()).split("_");
        const [calendar, time, milisecond] = part_format;
        const part_calendar = String(calendar).split("-");
        const part_time = String(time).split("-");
        const now = realNewDate();
        expect(
            JSON.stringify({
                part_format: part_format.length,
                part_calendar: part_calendar.length,
                part_time: part_time.length,
                length_milisecond: String(milisecond).length,
                result_year: parseInt(part_calendar[0]),
                result_hour: parseInt(part_time[0]),
            }),
        ).toBe(
            JSON.stringify({
                part_format: 3,
                part_calendar: 3,
                part_time: 3,
                length_milisecond: 3,
                result_year: now.getFullYear(),
                result_hour: now.getHours(),
            }),
        );
    });

    test("date : nowFormatLoggerFileName", async () => {
        const part_calendar = String(nowFormatLoggerFileName()).split("-");
        const now = realNewDate();
        expect(
            JSON.stringify({
                part_calendar: part_calendar.length,
                result_year: parseInt(part_calendar[0]),
                result_month: parseInt(part_calendar[1]),
                result_date: parseInt(part_calendar[2]),
            }),
        ).toBe(
            JSON.stringify({
                part_calendar: 3,
                result_year: now.getFullYear(),
                result_month: now.getMonth() + 1,
                result_date: now.getDate(),
            }),
        );
    });

    test("date : nowFormatLoggerPrint", async () => {
        const part_format = String(nowFormatLoggerPrint()).split(" ");
        const [calendar, time] = part_format;
        const part_calendar = String(calendar).split("/");
        const part_time = String(time).split(":");
        const now = realNewDate();
        expect(
            JSON.stringify({
                part_format: part_format.length,
                part_calendar: part_calendar.length,
                part_time: part_time.length,
                result_year: parseInt(part_calendar[0]),
                result_hour: parseInt(part_time[0]),
            }),
        ).toBe(
            JSON.stringify({
                part_format: 2,
                part_calendar: 3,
                part_time: 3,
                result_year: now.getFullYear(),
                result_hour: now.getHours(),
            }),
        );
    });

    test("date : nowWithFormat", async () => {
        const part_format = String(nowWithFormat()).split(" ");
        const [calendar, time] = part_format;
        const part_calendar = String(calendar).split("-");
        const part_time = String(time).split(":");
        const now = realNewDate();
        expect(
            JSON.stringify({
                part_format: part_format.length,
                part_calendar: part_calendar.length,
                part_time: part_time.length,
                result_year: parseInt(part_calendar[0]),
                result_hour: parseInt(part_time[0]),
            }),
        ).toBe(
            JSON.stringify({
                part_format: 2,
                part_calendar: 3,
                part_time: 3,
                result_year: now.getFullYear(),
                result_hour: now.getHours(),
            }),
        );
        expect(0).toBe(0);
    });

    test("random : Alphabet", async () => {
        expect(Alphabet()).toMatch(/^[a-zA-Z]+$/i);
    });

    test("random : Text", async () => {
        expect(Text()).toMatch(/^[a-zA-Z0-9]+$/i);
    });

    test("random : OTP", async () => {
        expect(OTP()).toMatch(/^\d+$/);
    });

    test("validation : isAlphaNumeric", async () => {
        const value = Text();
        const received = isAlphaNumeric(value);
        expect(received).toBe(true);
    });

    test("validation : isAlphabet", async () => {
        const value = Alphabet();
        const received = isAlphabet(value);
        expect(received).toBe(true);
    });

    test("validation : isNumeric", async () => {
        const random_number = String(randomIntFromInterval(100, 1000));
        const received = isNumeric(random_number);
        expect(received).toBe(true);
    });

    test("validation : isUndefined", async () => {
        expect(isUndefined(undefined)).toBe(true);
    });

    test("validation : isArray", async () => {
        expect(isArray(["test"])).toBe(true);
    });

    test("validation : isObject", async () => {
        expect(
            isObject({
                t3st: true,
            }),
        ).toBe(true);
    });

    test("validation : isEmail", async () => {
        const init_value = "jefriherditriyanto@gmail";
        const received = isEmail(init_value);
        expect(received).not.toBe(true);
    });

    // test("filename : function", async () => {
    //   //
    // });
});
