import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ExampleValue, JWT, Env } from "../config";

import { IRequestJoin } from "../contracts/request.contract";

export default (req: IRequestJoin, res: Response, next: NextFunction) => {
    if (Env.isUnitTest) {
        req.user = {
            id: ExampleValue.id,
            phone_number: ExampleValue.phone_number,
        };
        return next();
    }

    let token = req.headers.authorization || req.cookies["token"];
    if (String(token).startsWith("Bearer ")) {
        token = String(token).replace("Bearer ", "");
    }
    if (token) {
        return jwt.verify(
            token,
            JWT.secret,
            async (err: any, token_decoded: any) => {
                if (err) {
                    return res.status(401).json({
                        message: "Not Authorized!",
                    });
                } else {
                    req.user = token_decoded;
                    return next();
                }
            },
        );
    } else {
        return res.status(403).json({
            message: "Authorization Bearer is required!",
        });
    }
};
