import { createClient, RedisClientType } from "redis";

import { Redis as RedisConfig } from "../config";

let first = true;
class RedisApp {
    // HOST: string = RabbitConfig.host || "amqp://localhost";
    client!: RedisClientType;

    /**
     * Init connection to redis
     */
    async init(database = 0) {
        this.client = createClient({
            socket: {
                host: RedisConfig.host,
                port: RedisConfig.port,
            },
            username: RedisConfig.username,
            password: RedisConfig.password,
            database,
        });
        this.client.on("error", (err: any) => {
            console.log("Redis", err);
            process.exit(1);
        });
        this.client.on("connect", () => {
            if (first) {
                console.log("✅ Redis Connected!");
                first = false;
                this.client.disconnect();
            }
        });
        await this.client.connect();
    }

    /**
     * set/insert/include value on redis
     */
    async set(database: number, key: string, value: string): Promise<boolean> {
        try {
            await this.init(database);
            await this.client.set(key, value);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            this.client.disconnect();
        }
    }

    /**
     * get value on redis
     */
    async get(database: number, key: string): Promise<string | false | null> {
        try {
            await this.init(database);
            return await this.client.get(key);
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            this.client.disconnect();
        }
    }

    async delete(database: number, key: string) {
        try {
            await this.init(database);
            return await this.client.del(key);
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            this.client.disconnect();
        }
    }
}

// Init
const Redis = new RedisApp();
Redis.init();

export default RedisApp;
