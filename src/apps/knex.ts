import knex from "knex";

import { Knex, Env } from "../config";

export const Database = knex(Env.isUnitTest ? Knex.test : Knex.config);
export const DatabaseConnect = async (
    is_connected: Function | false = false,
) => {
    Database.raw("SELECT 1")
        .then(() => {
            if (!Env.isUnitTest) {
                console.log("✅ Database connected");
            }
            if (is_connected) {
                is_connected();
            }
        })
        .catch((e) => {
            console.log("X Database not connected");
            console.error(e);
            process.exit(1);
        });
};
