const express = require('express');
const app = express.Router();
const _ = require("lodash");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
var cors = require("cors");
const Sequelize = require("sequelize");
const emailValidator = require("email-validator");

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (sequelize, sendEmail) => {
    app.use(bodyParser.json());
    app.use(cors());

    app.use(passport.initialize());
    app.use(passport.session());

    const { UserController } = sequelize.import("../../controllers/user");
    const { FollowController } = sequelize.import("../../controllers/follow");

    passport.use(new GoogleStrategy({
        clientID: '706053629191-r4s6bedb4fcpfdrqf4gtbdpve1mevvgs.apps.googleusercontent.com',
        clientSecret: 'sYBpVZIbJxQGByuLqMwoDGTT',
        callbackURL: "/auth/google/callback"
    },
        function (accessToken, refreshToken, profile, cb) {
            console.log('profile: ', profile);

            var user = await UserController.find({ userId: profile.id })
            if (user.length == 0) {
                user = await UserController.create({
                    userId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value
                });
            }
            user = user[0];
            delete user.dataValues.password;
            user.dataValues.id = user.dataValues.userId;
            delete user.dataValues.userId;
            res
                .set("Authorization", "Bearer fake-jwt-token")
                .status(200)
                .send(user);
            return cb(err, user);

            // cb(null, {
            //     googleId: profile.id
            // });
            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //   return cb(err, user);
            // });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        }
    );

    app.get('/logout', function (req, res) {
        req.logout();
    });

    // login
    app.post("/login", (req, res) => {
        var userName = req.body.userName;
        var password = req.body.password;
        if (!userName)
            return res
                .status(400)
                .send({ error: { name: "userName is not specified" } });
        if (!password)
            return res
                .status(400)
                .send({ error: { name: "password is not specified" } });
        UserController.find({ userName }).then(user => {
            if (user.length == 0 || !bcrypt.compareSync(password, user[0].password))
                return res.status(400).send({ error: { name: "Invalid credentials" } });
            user = user[0];
            delete user.dataValues.password;
            user.dataValues.id = user.dataValues.userId;
            delete user.dataValues.userId;
            res
                .set("Authorization", "Bearer fake-jwt-token")
                .status(200)
                .send(user);
        });
    });
    // end of login

    app.post("/", (req, res) => {
        params = _.pick(req.body, [
            "userName",
            "password",
            "firstName",
            "lastName",
            "email",
            "bio",
            "dob",
            "location"
        ]);
        if (!params.userName)
            return res
                .status(400)
                .send({ error: { name: "userName is not specified" } });
        if (!params.password)
            return res
                .status(400)
                .send({ error: { name: "password is not specified" } });
        if (!params.email)
            return res
                .status(400)
                .send({ error: { name: "email is not specified" } });
        if (!emailValidator.validate(params.email))
            return res
                .status(400)
                .send({ error: { name: "Invalid email address" } });
        UserController.create(req.body)
            .then(user => {
                delete user.dataValues.password;
                return user;
            })
            .then(user => {
                // email
                console.log('sending: ', user.dataValues);
                sendEmail(JSON.stringify(user.dataValues));
                return user;
            })
            .then(user => {
                res
                    .set("Authorization", "Bearer fake-jwt-token")
                    .status(201)
                    .send({ user });
            })
            .catch(error => {
                if (error.name === "SequelizeUniqueConstraintError")
                    return res.status(409).send({ error });
                res.status(500).send({ error });
            });
    });

    app.post("/search", (req, res) => {
        let searchQuery = req.body.searchQuery;
        let userId = req.body.userId;
        console.log("Search endpoint hit");
        if (!searchQuery)
            return res
                .status(400)
                .send({ error: { name: "searchQuery is not specified" } });
        if (!userId)
            return res.status(400).send({ error: { name: "userId is not specified" } });

        UserController.find({
            userName: { [Sequelize.Op.like]: "%" + searchQuery + "%" }
        })
            .then(searchResult => {
                FollowController.find({ follower: userId }).then(users => {
                    followingList = Object.values(users.map(v => v.dataValues.following));
                    console.log(typeof followingList);

                    searchResult.forEach(result => {
                        delete result.dataValues.password;
                        result.dataValues.following = followingList.includes(
                            result.dataValues.userId
                        );
                    });

                    res
                        .set("Authorization", "Bearer fake-jwt-token")
                        .status(200)
                        .send(searchResult);
                });
            })
            .catch(error => {
                res.status(500).send({ error });
            });
    });

    app.get("/:userId", (req, res) => {
        var userId = req.params.userId;
        if (!userId) return res.status(400).send();

        UserController.find({ userId })
            .then(user => {
                if (user.length == 0) return res.status(404).send();
                res
                    .set("Authorization", "Bearer fake-jwt-token")
                    .status(200)
                    .send({ user: user[0] });
            })
            .catch(error => {
                res.status(500).send({ error });
            });
    });

    app.patch("/", (req, res) => {
        params = _.pick(req.body, [
            "userId",
            "userName",
            "firstName",
            "lastName",
            "bio",
            "dob",
            "location"
        ]);
        if (!params.userId) return res.status(400).send("userId is not specified");

        UserController.update(params)
            .then(result => {
                if (result[1] === 0) return res.status(404).send();
                res
                    .set("Authorization", "Bearer fake-jwt-token")
                    .status(200)
                    .send({ user: result[0] });
            })
            .catch(error => {
                res.status(500).send({ error });
            });
    });

    app.delete("/", (req, res) => {
        userId = req.body.userId;
        if (!userId) return res.status(400).send("userId is not specified");

        UserController.delete({ userId })
            .then(result => {
                if (result === 0) return res.status(404).send();
                res
                    .set("Authorization", "Bearer fake-jwt-token")
                    .status(202)
                    .send({ deletedCount: result });
            })
            .catch(error => {
                res.status(500).send({ error });
            });
    });
    // end of user routes
    return app;
}