const express = require("express");
const Sequelize = require("sequelize");
const amqp = require('./messaging/amqpClient');

// Pick and environment out of "development", "test", "production" and load configuration accordingly
var env = "development";
const connConfig = require("./config/connection")[env];

// Setup a database connection using loaded configuration
const sequelize = new Sequelize(
    connConfig.database,
    connConfig.username,
    connConfig.password,
    {
        dialect: connConfig.dialect,
        host: connConfig.host,
        operatorsAliases: false
    }
);

const app = express();

// var sendEmail;
// amqp.createClient()
//     .then(se => {
//         console.log('returned');
//         sendEmail = se;
//     })
//     .catch(err => {
//         console.log('Could not connect to RabbitMQ host: ', err);
//         process.exit(1);
//     });


const sendEmail = amqp.createClientSync();
const user = require("./routes/api/user.js")(sequelize, sendEmail);
const follow = require("./routes/api/follow.js")(sequelize);

app.use("/users", user);
app.use("/relation", follow);

sequelize.sync().then(
    () => {
        app.listen(3000, () => {
            console.log("Server started on port 3000..");
        });
    },
    error => {
        console.log("Error occurred while syncing database", error);
    }
);

module.exports = {
    app
};