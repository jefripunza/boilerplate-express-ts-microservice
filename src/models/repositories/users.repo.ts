import { Database } from "@/apps/knex";
import { tables } from "@/consts";

import * as sql from "@/helpers/sql";

import {
    IPaginationRequest,
    OrderByEnum,
} from "@/contracts/pagination.contract";

// ----------------------------------------------------------------

//-> Create

export const insert = async (
    name: string,
    username: string,
    password: string,
) => {
    await Database(tables.users).insert({ name, username, password });
};

//-> Read / Validation

export const count = async () => {
    return (await Database(tables.users).count("* as count").first())?.count;
};

export const isUsernameExist = async (username: string) => {
    return await Database(tables.users)
        .select("id")
        .where("username", username)
        .first();
};

export const isIdExist = async (id: string) => {
    return await Database(tables.users)
        .select("username")
        .where("id", id)
        .first();
};

export const pagination = async (query: IPaginationRequest) => {
    const defaultPage = 1,
        defaultPerPage = 10,
        page = query.page ? parseInt(query.page) : defaultPage,
        perPage = query.perPage ? parseInt(query.perPage) : defaultPerPage;

    const userIds = await Database(tables.users)
        .where(function () {
            if (query.search) {
                this.whereRaw(
                    sql.like(`${tables.users}.name`, query.search),
                ).orWhereRaw(
                    sql.like(`${tables.users}.username`, query.search),
                );
            }
        })
        .pluck("id");
    const count = userIds.length;

    let sort: any = false;
    if (query.sort) {
        if (["name", "username"].includes(query.sort)) {
            sort = `${tables.users}.${query.sort}`;
        }
    }

    const data = await Database(tables.users)
        // list data key
        .select(
            `${tables.users}.id`,
            `${tables.users}.name`,
            `${tables.users}.username`,
        )
        .whereIn("id", userIds)
        // join here...
        .orderBy(
            sort ? sort : `${tables.users}.id`,
            query.order ?? OrderByEnum.ASC,
        )
        .limit(perPage)
        .offset((page - 1) * perPage);

    return {
        data,
        meta: {
            page,
            perPage,
            total: Number(count),
            total_page: Math.ceil(Number(count) / perPage),
        },
    };
};

export const detailById = async (id: string) => {
    const user = await Database(tables.users)
        .select("name", "username")
        .where("id", id)
        .first();
    if (!user) {
        return false;
    }
    user.address =
        (await Database(tables.user_address)
            .select("name", "latitude", "longitude", "is_default")
            .where("id_user", id)) || [];
    return user;
};

//-> Update

interface IUserUpdate {
    name?: string;
    username?: string;
}
export const updateById = async (id: string, data: IUserUpdate) => {
    await Database(tables.users).where("id", id).update(data);
};

//-> Delete

export const deleteById = async (id: string) => {
    await Database(tables.users).where("id", id).delete();
};
