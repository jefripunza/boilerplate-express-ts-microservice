import { Response } from "express";

import { Rabbit as RabbitConfig } from "@/config";

import { IResponseService } from "@/core/boilerplate";
import * as jwt from "@/utils/jwt";

import RabbitMQ from "@/apps/rabbitmq";
import RedisApp from "@/apps/redis";

import * as Users from "@/models/repositories/users.repo";

// ----------------------------------------------------------------

export const loginByUsername = async (
    res: Response,
    username: string,
): Promise<IResponseService> => {
    try {
        if (!username) {
            return {
                code: 400,
                message: "body is'n complete!",
            };
        }
        const isUsernameExist = await Users.isUsernameExist(username);
        if (!isUsernameExist) {
            return {
                code: 400,
                message: "username not found!",
            };
        }

        const token = jwt.createToken(isUsernameExist);
        res.cookie("token", token, {
            maxAge: 900000,
            httpOnly: true,
        });

        return {
            render: { token, message: "token added!" },
        };
    } catch (error: any) {
        error.from = "TestService > loginByUsername";
        return { error };
    }
};

export const rabbitSend = async (
    message: string,
): Promise<IResponseService> => {
    try {
        if (!message) {
            return {
                code: 400,
                message: "body is'n complete!",
            };
        }

        const Rabbit = new RabbitMQ();
        await Rabbit.send(
            RabbitConfig.exchange.example,
            RabbitConfig.queue.example,
            {
                message,
            },
        );

        return {
            message: "message sended!",
        };
    } catch (error: any) {
        error.from = "TestService > rabbitSend";
        return { error };
    }
};

export const redisSend = async (message: string): Promise<IResponseService> => {
    try {
        if (!message) {
            return {
                code: 400,
                message: "body is'n complete!",
            };
        }

        const Redis = new RedisApp();
        Redis.set(
            0,
            "test",
            JSON.stringify({
                message,
            }),
        );

        return {
            message: "message sended!",
        };
    } catch (error: any) {
        error.from = "TestService > redisSend";
        return { error };
    }
};

export const redisGet = async (key: string): Promise<IResponseService> => {
    try {
        const Redis = new RedisApp();
        const get: any = await Redis.get(0, key);
        const result = JSON.parse(get) || false;

        return {
            render: { result },
        };
    } catch (error: any) {
        error.from = "TestService > redisGet";
        return { error };
    }
};

export const redisDelete = async (key: string): Promise<IResponseService> => {
    try {
        const Redis = new RedisApp();
        await Redis.delete(0, key);

        return {
            message: "success delete!",
        };
    } catch (error: any) {
        error.from = "TestService > redisDelete";
        return { error };
    }
};
