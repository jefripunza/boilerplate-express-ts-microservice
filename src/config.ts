import path from "path";
import dotenv from "dotenv";

import { Knex as KnexInterface } from "knex";

export namespace ExampleValue {
    export const id = 1;
    export const phone_number = "082214252455";
}

const NODE_ENV = process.env.NODE_ENV ?? "local";
process.env.NODE_ENV = NODE_ENV;
export namespace Env {
    export const local = "local";
    export const development = "development";
    export const sit = "sit";
    export const uat = "uat";
    export const production = "production";
    export const isDev = ![Env.uat, Env.production].includes(NODE_ENV);
    export const isUnitTest = process.env.UNIT_TEST === "true";
}

export namespace Path {
    export const project_root =
        process.env.PWD || // Docker
        process.env.INIT_CWD || // Cloud
        process.env.LSNODE_ROOT || // Hosting
        path.join(__dirname, ".."); // if all not found...
    export namespace server {
        export const routers = path.join(__dirname, "routers");
        export const tasks = path.join(__dirname, "tasks");
        export const env = path.join(project_root, ".env");
    }
    export namespace rabbit {
        export const consumers = path.join(__dirname, "consumers");
    }
    export namespace models {
        export const migrations = path.join(__dirname, "models", "migrations");
        export const seeds = path.join(__dirname, "models", "seeds");
    }
}

export namespace File {
    export namespace swagger {
        export const json = path.join(Path.project_root, "swagger.json");
    }
    export namespace unit_test {
        export const db_sqlite = path.join(Path.project_root, "test.sqlite3");
    }
}

if (!Env.isUnitTest) {
    dotenv.config({ path: Path.server.env });
    if (!process.env?.PORT) {
        throw new Error("file environment not found!");
    }
}

export namespace Server {
    export const port = Number(process.env.PORT);
    export const TZ = process.env.TZ ?? "Asia/Jakarta";
    export const secret_key = process.env.SECRET_KEY ?? "default";
    export const barrier = "======================";
}

export namespace JWT {
    export const secret: string = process.env.JWT_SECRET ?? "test";
    export const expired: string = process.env.JWT_EXPIRED ?? "7d";
}

export namespace Database {
    export const client = process.env.DB_TYPE ?? "pg";
    export const host = process.env.DB_HOST ?? "localhost";
    export const port = Number(process.env.DB_PORT ?? 5432);
    export const user = process.env.DB_USER ?? "root";
    export const password = process.env.DB_PASS ?? "";
    export const database = process.env.DB_NAME ?? "dbname";

    export const poolMin = Number(process.env.DB_POOL_MIN ?? 0);
    export const poolMax = Number(process.env.DB_POOL_MAX ?? 10);
}

const migration_seed = {
    migrations: {
        tableName: "knex_migrations",
        directory: Path.models.migrations,
    },
    seeds: {
        directory: Path.models.seeds,
    },
};
export namespace Knex {
    export const config: KnexInterface.Config = {
        client: Database.client,
        connection: {
            host: Database.host,
            port: Database.port,
            user: Database.user,
            password: Database.password,
            database: Database.database,
        },
        pool: {
            min: Database.poolMin,
            max: Database.poolMax,
        },
        ...migration_seed,
    };

    export const test: KnexInterface.Config = {
        client: "sqlite3",
        connection: {
            filename: File.unit_test.db_sqlite,
        },
        useNullAsDefault: true,
        ...migration_seed,
    };
}

export namespace Rabbit {
    export const host = process.env.RABBIT_HOST;
    export namespace exchange {
        export const example = process.env.EXAMPLE_EXCHANGE || "test-exchange";
    }
    export namespace queue {
        export const example = process.env.EXAMPLE_QUEUE || "test-queue";
    }
}

export namespace Redis {
    export const host = process.env.REDIS_HOST ?? "localhost";
    export const port = Number(process.env.REDIS_PORT ?? 6379);
    export const username = process.env.REDIS_USER ?? "";
    export const password = process.env.REDIS_PASS ?? "";
}

export namespace Services {
    export const auth = process.env.AUTH_SERVICE;
}
