import jwt from "jsonwebtoken";
import { JWT } from "@/config";
import { ITokenContent } from "@/contracts/request.contract";

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

export interface ITokenVerify {
    error?: boolean;
    status: number;
    message?: string;
    data?: ITokenContent;
}
export const tokenVerify = async (token: string): Promise<ITokenVerify> => {
    if (String(token).startsWith("Bearer ")) {
        token = String(token).replace("Bearer ", "");
    }
    if (token) {
        const result: ITokenVerify = await new Promise((resolve) => {
            jwt.verify(
                token,
                JWT.secret,
                async (err: any, token_decoded: any) => {
                    if (err) {
                        resolve({
                            error: true,
                            status: 401,
                            message: "Not Authorized!",
                        });
                    } else {
                        resolve({
                            status: 200,
                            data: token_decoded,
                        });
                    }
                },
            );
        });
        return result;
    } else {
        return {
            error: true,
            status: 403,
            message: "Authorization Bearer is required!",
        };
    }
};
