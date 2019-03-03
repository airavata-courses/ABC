const amqp = require('amqplib');
const { constants } = require('./constants');

const createClient = () => {
    return new Promise((resolve, reject) => {
        amqp.connect(constants.RABBITMQ_HOST)
            .then(conn => conn.createChannel())
            .then(channel => {
                const sendEmail = (message) => new Promise(resolve => {
                    channel.assertQueue(constants.EMAIL_QUEUE);
                    channel.sendToQueue(constants.EMAIL_QUEUE, Buffer.from(message));
                    resolve();
                });
                resolve(sendEmail);
            })
            .catch(err => reject(err));
    });
}

const createClientSync = () => {
    var sendEmail;

    createClient().then((se) => {
        sendEmail = se;
    });

    while (!sendEmail)
        require('deasync').sleep(100);
    return sendEmail;
}

module.exports = {
    createClient,
    createClientSync
}