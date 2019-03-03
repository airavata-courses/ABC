const nodeMailer = require('nodemailer');

const sendWelcomeEmail = (user) => {
    let account = {
        user: 'abc.sga2019@gmail.com',
        pass: 'abc@sga123'
    };

    let html = `<h3>Hi ${user.firstName}! Welcome to ABC Twitter</h3>`;
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
        to: user.email,// list of receivers
        subject: 'Welcome', //line
        html: html
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('error in sending mail', err);
                reject(err);
            } else {
                resolve(info);
            }
        });
    });

};

module.exports = {
    sendWelcomeEmail
}