const { Kafka } = require("kafkajs");
const log_data = require("./system_logs.json");

createProducer();

async function createProducer(){
    try {
        const kafka = new Kafka({
            clientId: "kafka_exp2",
            brokers: ["192.168.1.107:9092"]
        });
        
        const producer = kafka.producer();
        await producer.connect();

        let messages = log_data.map(item => {
            return {
                value: JSON.stringify(item),
                partition: item.type == "system" ? 0 : 1
            }
        });
        const message_result = await producer.send({
            topic: "LogStoreTopic",
            messages: messages
        });
        console.log("message sent succesfully", JSON.stringify(message_result));
        await producer.disconnect();
    } catch (error) {
        console.log("an error occured", error);
    }finally{
        process.exit(0);
    }
}