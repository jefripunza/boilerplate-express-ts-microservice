import { Knex } from "knex";

import { tables, user_roles } from "../../consts";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tables.users, function (table) {
        table.increments();

        table.string("name").notNullable();

        // for auth
        table.string("username", 16).unique().notNullable();
        table.string("password").notNullable();

        table
            .enum("role", Object.values(user_roles))
            .defaultTo(user_roles.buyer)
            .notNullable();

        table.boolean("is_validated").defaultTo(false);
        table.boolean("is_blocked").defaultTo(false);

        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());

        //-> Indexing
        table.index(["username"], "users username idx");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tables.users);
}
