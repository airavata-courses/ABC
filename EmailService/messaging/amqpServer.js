const amqp = require('amqplib');

const startServer = () => {
    amqp.connect('amqp://localhost')
        .then(conn => conn.createChannel())
        .then(channel => {
            channel.assertQueue(constants.EMAIL_QUEUE);
            channel.consume(constants.EMAIL_QUEUE, message => {
                console.log(message);
            })
        });
}

module.exports = {
    startServer
}