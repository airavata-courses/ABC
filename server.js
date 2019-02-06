const express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const _ = require("lodash");

const queue = require("./messaging");

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

const { UserController } = sequelize.import("./controllers/user");
const { FollowController } = sequelize.import("./controllers/follow");

const app = express();
app.use(bodyParser.json());

// user create, get, update, delete routes
app.post("/user", (req, res) => {
  params = _.pick(req.body, ["userName", "name", "bio", "dob", "location"]);
  if (!params.userName)
    return res.status(400).send("userName is not specified");
  if (!params.name) return res.status(400).send("name is not specified");
  if (!params.bio) return res.status(400).send("bio is not specified");
  if (!params.dob) return res.status(400).send("dob is not specified");
  if (!params.location)
    return res.status(400).send("location is not specified");

  UserController.create(req.body)
    .then(user => {
      res.status(201).send({ user });
    })
    .catch(error => {
      if (error.name === "SequelizeUniqueConstraintError")
        return res.status(409).send({ error });
      res.status(500).send({ error });
    });
});

app.get("/user/:userId", (req, res) => {
  var userId = req.params.userId;
  if (!userId) return res.status(400).send();

  UserController.find({ userId })
    .then(user => {
      if (user.length == 0) return res.status(404).send();
      res.status(200).send({ user: user[0] });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

app.patch("/user", (req, res) => {
  params = _.pick(req.body, [
    "userId",
    "userName",
    "name",
    "bio",
    "dob",
    "location"
  ]);
  if (!params.userId) return res.status(400).send("userId is not specified");

  UserController.update(params)
    .then(result => {
      if (result[1] === 0) return res.status(404).send();
      res.status(200).send({ user: result[0] });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

app.delete("/user", (req, res) => {
  userId = req.body.userId;
  if (!userId) return res.status(400).send("userId is not specified");

  UserController.delete({ userId })
    .then(result => {
      if (result === 0) return res.status(404).send();
      res.status(202).send({ deletedCount: result });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});
// end of user routes

// follow create, delete, get followers, get following routes
app.post("/user/follow", (req, res) => {
  if (!req.body.follower || !req.body.following) return res.status(400).send();
  FollowController.create(req.body)
    .then(follow => {
      res.status(201).send({ follow });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

app.delete("/user/follow", (req, res) => {
  if (!req.body.follower || !req.body.following) return res.status(400).send();
  FollowController.delete(req.body)
    .then(result => {
      res.status(202).send({ deletedCount: result[1] });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

app.get("/user/:userId/followers", (req, res) => {
  var userId = req.params.userId;
  if (!userId) return res.status(400).send();
  FollowController.find({ following: userId })
    .then(result => {
      res.status(200).send({
        count: result.length,
        followers: _.map(result, item => {
          return {
            userId: item.follower,
            createdAt: item.createdAt
          };
        })
      });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

app.get("/user/:userId/following", (req, res) => {
  var userId = req.params.userId;
  if (!userId) return res.status(400).send();
  FollowController.find({ follower: userId })
    .then(result => {
      res.status(200).send({
        count: result.length,
        following: _.map(result, item => {
          return {
            userId: item.following,
            createdAt: item.createdAt
          };
        })
      });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});
// end of follow routes

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

module.exports = {
  app
};
