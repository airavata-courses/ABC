const kafka = require("kafka-node");

// var client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
// var consumer = new kafka.Consumer(client, [{ topic: "twitter", fromOffset: -1 }], {
//   autoCommit: false
// });
// consumer.on("message", function(message) {
//   console.log(message);
//   try {
//     console.log(JSON.parse(message.value));
//   } catch (e) {}
// });
// consumer.on("error", function(message) {
//   console.log(message);
// });

// var producer = new kafka.Producer(client);
// producer.on("ready", () => {
//   var payload = [
//     {
//       topic: "twitter",
//       messages: "hello from nodejs again"
//     }
//   ];
//   producer.send(payload, (err, data) => {
//     if (err) console.log("error sending payload: ", err);
//     else console.log("Successful: ", data);
//   });
// });
// producer.on("error", function(err) {
//   console("producer error: ", err);
// });
