const amqp = require('amqplib');

const startServer = () => {
    amqp.connect('amqp://localhost')
        .then(conn => conn.createChannel())
        .then(channel => {
            channel.assertQueue(constants.EMAIL_QUEUE, {durable: true});
            channel.consume(constants.EMAIL_QUEUE, message => {
                console.log(message);
            }, {noAck: true})
        });
}

module.exports = {
    startServer
}
