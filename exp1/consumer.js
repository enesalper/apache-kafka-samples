const { Kafka } = require("kafkajs");

const topic_name = process.argv[2] || "Logs2";
const partition = process.argv[3] || 0; 

createConsumer();

async function createConsumer(){
    try {
        const kafka = new Kafka({
            clientId: "kafka_exp1",
            brokers: ["192.168.1.107:9092"]
        });
        const consumer = kafka.consumer({
            groupId: "exp1_cg1"
        });
        await consumer.connect();
        await consumer.subscribe({
            topic: topic_name,
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