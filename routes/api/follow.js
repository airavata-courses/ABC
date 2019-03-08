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
                'select u.userId, u.userName, u.firstName, u.lastName, u.email, g.following from users as u, (select f.follower, if(f.ifFollows IS NULL, "false", "true") as following from ( select f1.follower, f2.ifFollows from ( select follower from follows as f where f.following = "' + userId + '" ) as f1 left join ( select following as follower,TRUE as ifFollows from follows as f where f.follower = "' + userId + '") f2 on f1.follower = f2.follower) as f) as g where u.userId = g.follower;'
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
                'select userId, userName, firstName, lastName, email from users where userId in (select following from follows where follower="' + userId + '")'
            )
            .then(result => {
                result = result[0];
                for (let i = 0; i < result.length; ++i)
                    result[i]['following'] = "true";

                res
                    .set("Authorization", "Bearer fake-jwt-token")
                    .status(200)
                    .send(result);
            })
            .catch(error => {
                res.status(500).send({ error });
            });
    });
// end of follow routes
    return app;
};