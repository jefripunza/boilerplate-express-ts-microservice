import { Knex } from "knex";

export async function up(knex: Knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
}

export function down() {
    throw new Error(
        "Downward migrations are not supported. Restore from backup.",
    );
}
