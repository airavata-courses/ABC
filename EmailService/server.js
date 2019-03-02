const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib');
const { constants } = require('./messaging/constants');
const gmail = require('./email/gmail');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

amqp.connect(constants.RABBITMQ_HOST)
    .then(conn => conn.createChannel())
    .then(channel => {
        channel.assertQueue(constants.EMAIL_QUEUE);
        channel.consume(constants.EMAIL_QUEUE, message => {
            var user = JSON.parse(message.content.toString());
            gmail.sendWelcomeEmail(user)
                .then(info => {
                    console.log('Successfully sent email: ', info);
                }, err => {
                    console.log('Error sending email: ', email);
                });
        })
    });

app.post('/sendWelcomeEmail', (req, res) => {
    gmail.sendWelcomeEmail(req.body.user)
        .then(info => {
            res.status(200).send();
        }, err => {
            console.log('Error sending email: ', err);
            res.status(500).send(err);
        });
})

app.listen(3002, () => {
    console.log("Server started on port 3002..");
});

module.exports = {
    app
};