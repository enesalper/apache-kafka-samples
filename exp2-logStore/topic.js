const { Kafka } = require("kafkajs");

createTopic();

async function createTopic(){
    try {
        const kafka = new Kafka({
            clientId: "kafka_exp2",
            brokers: ["192.168.1.107:9092"]
        });
        const admin = kafka.admin();
        await admin.connect();
        await admin.createTopics({
            topics: [
                {
                    topic: "LogStoreTopic",
                    numPartitions: 2
                }
            ]
        });
        await admin.disconnect();
    } catch (error) {
        console.log("an error occured", error);
    }finally{
        process.exit(0);
    }
}