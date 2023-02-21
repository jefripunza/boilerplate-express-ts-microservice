import { Request } from "express";

export interface ITokenContent {
    id: number;
    phone_number: string;
}

interface IReqUser {
    user?: ITokenContent;
}
export interface IRequestJoin extends Request, IReqUser {}
