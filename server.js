const express = require("express");
const Sequelize = require("sequelize");


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

sequelize.sync().then(
    () => {
        app.listen(3000, () => {
            console.log("Server started on port 3000..");
        });
    },
    error => {
        console.log("Error occurred while syncing database");
    }
);

const user = require("./routes/api/user.js")(sequelize);
const follow = require("./routes/api/follow.js")(sequelize);

app.use("/users", user);
app.use("/relation", follow);

module.exports = {
    app
};
