const { Kafka } = require("kafkajs");

createProducer();

async function createProducer(){
    try {
        const kafka = new Kafka({
            clientId: "kafka_exp3",
            brokers: ["192.168.1.107:9092"]
        });
        const producer = kafka.producer();
        await producer.connect();

        const message_result = await producer.send({
            topic: "raw_video_topic",
            messages: [
                {
                    value: "new video content",
                    partition: 0
                }
            ]
        });
        console.log("succesfully sent", JSON.stringify(message_result));
        await producer.disconnect();
    } catch (error) {
        console.log("an error occured", error);
    }finally{
        process.exit(0);
    }
}