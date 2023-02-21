import { Knex } from "knex";

import { tables } from "../../consts";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tables.user_address, function (table) {
        table.increments();

        table.string("name").notNullable();

        table.string("latitude").notNullable();
        table.string("longitude").notNullable();

        table
            .integer("id_user")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable(tables.users);

        table.boolean("is_default").defaultTo(false);

        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());

        //-> Indexing
        table.index(["is_default"], "user_address is_default idx");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tables.user_address);
}
