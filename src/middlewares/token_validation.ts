import { Response, NextFunction } from "express";

import { tokenVerify } from "@/utils/jwt";
import { ExampleValue, Env } from "@/config";

import { IRequestJoin, ITokenContent } from "@/contracts/request.contract";

export default async (req: IRequestJoin, res: Response, next: NextFunction) => {
    if (Env.isUnitTest) {
        const example_user: ITokenContent = {
            id: ExampleValue.id,
        };
        req.user = example_user;
        return next();
    }

    const { error, status, message, data } = await tokenVerify(
        req.headers.authorization || req.cookies["token"],
    );
    if (error) {
        return res.status(status).json({
            message,
        });
    }

    req.user = data;
    return next();
};
