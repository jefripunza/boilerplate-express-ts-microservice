import { Request } from "express";

export interface ITokenContent {
    id: number;
}

interface IReqUser {
    user?: ITokenContent;
}
export interface IRequestJoin extends Request, IReqUser {}
