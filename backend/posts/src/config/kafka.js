import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "posts-service",
  brokers: [process.env.KAFKA_BROKER],
});

export const producer = kafka.producer();

export default producer;
