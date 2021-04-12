const { Kafka } = require("kafkajs");

const topic_name = process.argv[2] || "Logs2"; //node producer.js Logs2(or Logs)
const partition = process.argv[3] || 0;        //node producer.js Logs 1 (or 0)

createProducer();

async function createProducer(){
    try {
        const kafka = new Kafka({
            clientId: "kafka_exp1",
            brokers: ["192.168.1.107:9092"]
        });
        const producer = kafka.producer();
        await producer.connect();

        const message_result = await producer.send({
            topic: topic_name,
            messages: [
                {
                    value: "this is a test log message...",
                    partition: partition
                }
            ]
        });
        await producer.disconnect();
    } catch (error) {
        console.log("an error occurred", error);
    }finally{
        process.exit(0);
    }
}