import { Knex } from "knex";

import { tables } from "../../consts";

export const seed = async (knex: Knex) => {
    // Deletes ALL existing entries
    await knex(tables.users).del();
    await knex(tables.users).insert([
        {
            id: 1,
            name: "Super Admin",
            username: "superman",
            password: "<password>",
        },
    ]);
};
