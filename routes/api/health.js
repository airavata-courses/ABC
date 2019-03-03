const express = require('express');
const app = express.Router();
const _ = require("lodash");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
var cors = require("cors");
const Sequelize = require("sequelize");
const emailValidator = require("email-validator");

module.exports = () => {
    app.use(bodyParser.json());
    app.use(cors());

    app.get("/", (req, res) => {
        res.status(200).send({ status: 'healthy' });
    });

    return app;
}