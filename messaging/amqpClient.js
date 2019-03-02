const amqp = require('amqplib');
const { constants } = require('./constants');

// const createClient = () => amqp.connect(constants.RABBITMQ_HOST, (err, conn) => {
//     if (err)
//         return { err, channel };

//     conn.createChannel((err, ch) => {
//         if (err)
//             return { err, ch };
//         return { err, ch };
//     });
// });

const createClient = () => {
    console.log('createClient')
    return new Promise((resolve, reject) => {
        amqp.connect(constants.RABBITMQ_HOST)
            .then(conn => conn.createChannel())
            .then(channel => {

                const sendEmail = (message) => new Promise(resolve => {
                    console.log('Received: ', message);
                    channel.assertQueue(constants.EMAIL_QUEUE);
                    channel.sendToQueue(constants.EMAIL_QUEUE, Buffer.from(message));
                    resolve();
                });
                resolve(sendEmail);
            })
            .catch(err => reject(err));
    });
}

module.exports = {
    createClient
}