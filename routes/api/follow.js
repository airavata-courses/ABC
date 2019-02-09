const express = require('express');
const app = express.Router();
const bodyParser = require("body-parser");
var cors = require("cors");
const Sequelize = require("sequelize");

module.exports = (sequelize) => {

    app.use(bodyParser.json());
    app.use(cors());


    const { UserController } = sequelize.import("../../controllers/user");
    const { FollowController } = sequelize.import("../../controllers/follow");

    // follow create, delete, get followers, get following routes
    app.post("/user/follow", (req, res) => {
        if (!req.body.follower || !req.body.following) return res.status(400).send();
        FollowController.create(req.body)
            .then(follow => {
                res
                    .set("Authorization", "Bearer fake-jwt-token")
                    .status(201)
                    .send({ follow });
            })
            .catch(error => {
                res.status(500).send({ error });
            });
    });

    app.delete("/user/follow", (req, res) => {
        if (!req.body.follower || !req.body.following) return res.status(400).send();
        FollowController.delete(req.body)
            .then(result => {
                res
                    .set("Authorization", "Bearer fake-jwt-token")
                    .status(202)
                    .send({ deletedCount: result[1] });
            })
            .catch(error => {
                res.status(500).send({ error });
            });
    });

    app.get("/user/:userId/followers", (req, res) => {
        var userId = req.params.userId;
        if (!userId) return res.status(400).send();
        sequelize
            .query(
                'SELECT follows.follower as userId, users.userName, users.firstName, users.lastName FROM follows, users WHERE follows.follower = users.userId AND follows.follower in (SELECT follower as follower FROM follows WHERE following="' +
                userId +
                '")'
            )
            .then(result => {
                console.log(result);
                res
                    .set("Authorization", "Bearer fake-jwt-token")
                    .status(200)
                    .send(result[0]);
            })
            .catch(error => {
                res.status(500).send({ error });
            });
    });

    app.get("/user/:userId/following", (req, res) => {
        var userId = req.params.userId;
        if (!userId) return res.status(400).send();

        sequelize
            .query(
                'SELECT follows.following as userId, users.userName, users.firstName, users.lastName FROM follows, users WHERE follows.following = users.userId AND follows.following in (SELECT following FROM follows WHERE follower="' +
                userId +
                '")'
            )
            .then(result => {
                console.log(result);
                res
                    .set("Authorization", "Bearer fake-jwt-token")
                    .status(200)
                    .send(result[0]);
            })
            .catch(error => {
                res.status(500).send({ error });
            });
    });
// end of follow routes
    return app;
};