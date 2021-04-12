const { Kafka } = require("kafkajs");

createConsumer();

async function createConsumer(){
    try {
        const kafka = new Kafka({
            clientId: "kafka_exp2",
            brokers: ["192.168.1.107:9092"]
        });
        const consumer = kafka.consumer({
            groupId: "exp2_cg1"
        });
        await consumer.connect();
        await consumer.subscribe({
            topic: "LogStoreTopic",
            fromBeginning: true
        });
        await consumer.run({
            eachMessage: async result => {
                console.log(`incoming message: ${result.message.value}, Par: ${result.partition}`);
            }
        });
    } catch (error) {
        console.log("an error occured", error);
    }
}