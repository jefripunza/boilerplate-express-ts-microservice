import fs from "fs";
import path from "path";

import amqp from "amqplib";
import { Rabbit as RabbitConfig, Path } from "../config";

type ReceiveCallback = (content: {}, ack: Function) => Promise<void>;

let first = true;
class RabbitMQ {
    HOST: string = RabbitConfig.host || "amqp://localhost";
    connection!: amqp.Connection;
    channel!: amqp.Channel;

    /**
     * Init connection to rabbitmq
     */
    async init() {
        try {
            this.connection = await amqp.connect(this.HOST, "heartbeat=60");
            this.channel = await this.connection.createChannel();
            if (first) {
                const [credential, host] = String(this.HOST)
                    .split("://")[1]
                    .split("@");
                const [username, password] = String(credential).split(":");
                const view_host = String(this.HOST).includes("localhost")
                    ? this.HOST
                    : `amqp://${this.#createHideDot(
                          username,
                      )}:${this.#createHideDot(password)}@${host}`;
                console.log(`✅ Rabbit Connected on ${view_host}`);
                this.#run_consumers();
                first = false;
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
    #createHideDot = (value: string) => {
        return [...Array(value.length).keys()].map((v) => "*").join("");
    };

    /**
     * Publish message to exchange
     */
    async send(exchange: string, queue: string, msg: Object | any[]) {
        const routingKey = "";
        try {
            await this.init();
            await this.channel.assertExchange(exchange, "direct", {
                durable: true,
            });
            await this.channel.assertQueue(queue, { durable: true });
            await this.channel.bindQueue(queue, exchange, routingKey);
            await this.channel.publish(
                exchange,
                routingKey,
                Buffer.from(JSON.stringify(msg)),
                {
                    persistent: true,
                },
            );
            return true;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setTimeout(() => {
                this.channel.close();
                this.connection.close();
            }, 500);
        }
    }

    /**
     * Listen message from queue
     */
    async listen(queue: string, receive: ReceiveCallback) {
        try {
            await this.init();
            await this.channel.assertQueue(queue, { durable: true });
            this.channel.consume(queue, (data) => {
                if (data) {
                    const ack = () => {
                        this.channel.ack(data);
                    };
                    receive(
                        JSON.parse(Buffer.from(data.content).toString()),
                        ack,
                    );
                }
            });
        } catch (error: any) {
            new Error(error);
        }
    }

    async #run_consumers() {
        if (!fs.existsSync(Path.rabbit.consumers)) return;
        await fs
            .readdirSync(Path.rabbit.consumers)
            .forEach(async (consumer_filename) => {
                if (String(consumer_filename).startsWith("#")) return; // non active
                const consumer_name = String(consumer_filename)
                    .split(".")[0]
                    .split("-")
                    .map((v) => String(v)[0].toUpperCase() + String(v).slice(1))
                    .join(" ");
                const consume: any = await import(
                    path.join(Path.rabbit.consumers, consumer_filename)
                );
                const Consume = consume.default;
                Consume(); // execute
                console.log(`✅ Consumer ${consumer_name} is Ready!`);
            });
    }
}

// Init
const Rabbit = new RabbitMQ();
Rabbit.init();

export default RabbitMQ;
