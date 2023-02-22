import { DatabaseConnect } from "@/apps/knex";
import { StartServer } from "@/apps/server";
import "@/apps/rabbitmq";
import "@/apps/redis";

DatabaseConnect(() => {
    StartServer();
});
