const { Kafka } = require("kafkajs");

createConsumer();

async function createConsumer(){
    try {
        const kafka = new Kafka({
            clientId: "kafka_exp3",
            brokers: ["192.168.1.107:9092"]
        });
        const consumer = kafka.consumer({
            groupId: "hd_4k_8k_encoder_cg"
        });
        await consumer.connect();
        await consumer.subscribe({
            topic: "raw_video_topic",
            fromBeginning: true
        });
        await consumer.run({
            eachMessage: async result => {
                console.log(`processed video ${result.message.value}_4k_8k_encoder`);
            }
        });
    } catch (error) {
        console.log("an error occured", error);
    }
}