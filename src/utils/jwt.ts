import jwt from "jsonwebtoken";
import { JWT } from "@/config";

interface IOption {
    expiresIn?: string;
}

export const createToken = (object: object, expiresIn = false) => {
    const options: IOption = {};
    if (!expiresIn) {
        options.expiresIn = JWT.expired;
    }
    return jwt.sign(object, JWT.secret, options);
};
