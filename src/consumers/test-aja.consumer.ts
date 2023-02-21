import { Rabbit as RabbitConfig } from "../config";
import RabbitMQ from "../apps/rabbitmq";

export default () => {
    const Rabbit = new RabbitMQ();
    Rabbit.listen(RabbitConfig.queue.example, async (content, done) => {
        console.log({ content });
        done();
    });
};
