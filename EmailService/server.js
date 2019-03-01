const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.post('/send', (req, res) => {
    let account = {
        user: 'abc.sga2019@gmail.com',
        pass: 'abc@sga123'
    };
    let html = `<h3>Hi ${req.body.firstName}! Welcome to ABC Twitter</h3>`;
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: account.user,
            pass: account.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'ABC Twitter', // sender address
        to: req.body.email,// list of receivers
        subject: req.body.subject, //line
        html: html
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log('error in sending mail', err);
            res.status(500).send(err);
        } else
            res.status(200).send(info);
    });
})

app.listen(3002, () => {
    console.log("Server started on port 3002..");
});

module.exports = {
    app
};