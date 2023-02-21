import { Response } from "express";

const batas = "# ================================================ #";

interface IErrorCustom extends Error {
    from: string; // name service
}
export interface IResponseService {
    code?: number;
    message?: string;
    render?: Object;
    error?: IErrorCustom;
}

export const Controller = async (res: Response, service: IResponseService) => {
    let { code, message, render, error } = service;
    if (!code) {
        code = 200;
    }

    if (render) {
        return res.status(code).json(render);
    }

    if (error) {
        code = 500;
        message = "internal server error!";
        console.log(batas);
        console.log(`From    : `, error.from);
        console.log(`Name    : `, error.name);
        console.log(`Message : `, error.message);
        console.log(`Stack   : `, error.stack);
        console.log(batas);
    }

    return res.status(code).json({
        message,
    });
};
