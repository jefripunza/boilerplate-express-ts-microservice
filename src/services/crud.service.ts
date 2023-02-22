import { IResponseService } from "@/core/boilerplate";
import { IPaginationRequest } from "@/contracts/pagination.contract";

import * as encryption from "@/utils/encryption";

import * as Users from "@/models/repositories/users.repo";

// ----------------------------------------------------------------

export const add = async (
    name: string,
    username: string,
    password: string,
): Promise<IResponseService> => {
    try {
        if (!(name && username && password)) {
            return {
                code: 400,
                message: "body tidak komplit!",
            };
        }

        if (String(password).length < 8) {
            return {
                code: 400,
                message: "password harus lebih atau sama dengan 8!",
            };
        }

        const isUsernameExist = await Users.isUsernameExist(username);
        if (isUsernameExist) {
            return {
                code: 400,
                message: "username sudah terdaftar!",
            };
        }

        password = encryption.encode(password);

        await Users.insert(name, username, password);

        return {
            code: 200,
            message: "success inserted!",
        };
    } catch (error: any) {
        console.log({
            error: "CrudService > add",
            message: error.message,
        });
        return {
            code: 500,
            render: { message: "internal server error" },
        };
    }
};

export const pagination = async (request: any): Promise<IResponseService> => {
    let query: IPaginationRequest = request;

    try {
        const render = await Users.pagination(query);

        return {
            code: 200,
            render,
        };
    } catch (error: any) {
        error.from = "CrudService > pagination";
        return { error };
    }
};

export const detail = async (id: string): Promise<IResponseService> => {
    try {
        const render = await Users.detailById(id);

        return {
            code: 200,
            render,
        };
    } catch (error: any) {
        console.log({
            error: "CrudService > detail",
            message: error.message,
        });
        return {
            code: 500,
            render: { message: "internal server error" },
        };
    }
};

export const edit = async (
    id: string,
    name: string | undefined,
    username: string | undefined,
): Promise<IResponseService> => {
    try {
        if (!(name || username)) {
            return {
                code: 400,
                message: "select one!",
            };
        }

        const isIdExist = await Users.isIdExist(id);
        if (!isIdExist) {
            return {
                code: 400,
                message: "id user tidak ditemukan!",
            };
        }

        if (username) {
            if (isIdExist.username != username) {
                const isUsernameExist = await Users.isUsernameExist(username);
                if (isUsernameExist) {
                    return {
                        code: 400,
                        message: "username sudah digunakan!",
                    };
                }
            }
        }

        await Users.updateById(id, { name, username });

        return {
            code: 200,
            message: "success updated!",
        };
    } catch (error: any) {
        console.log({
            error: "CrudService > edit",
            message: error.message,
        });
        return {
            code: 500,
            render: { message: "internal server error" },
            error,
        };
    }
};

export const remove = async (id: string): Promise<IResponseService> => {
    try {
        const isIdExist = await Users.isIdExist(id);
        if (!isIdExist) {
            return {
                code: 400,
                message: "id user tidak ditemukan!",
            };
        }

        await Users.deleteById(id);
        return {
            code: 200,
            message: "success deleted!",
        };
    } catch (error: any) {
        console.log({
            error: "CrudService > remove",
            message: error.message,
        });
        return {
            code: 500,
            render: { message: "internal server error" },
        };
    }
};
