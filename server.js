const express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const _ = require("lodash");

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
  params = _.pick(req.body, ["username", "name", "bio", "dob", "location"]);
  if (!params.username)
    return res.status(400).send("username is not specified");
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

app.get("/user/:username", (req, res) => {
  var username = req.params.username;
  if (!username) return res.status(400).send();

  UserController.find({ username })
    .then(user => {
      if (user.length == 0) return res.status(404).send();
      res.status(200).send({ user: user[0] });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

app.patch("/user", (req, res) => {
  params = _.pick(req.body, ["username", "name", "bio", "dob", "location"]);
  if (!params.username) return res.status(400).send("No username is specified");

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
  username = req.body.username;
  if (!username) return res.status(400).send("No username is specified");

  UserController.delete({ username })
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
app.post("/follow", (req, res) => {
  if (!req.body.follower || !req.body.following) return res.status(400).send();
  FollowController.create(req.body)
    .then(follow => {
      res.status(201).send({ follow });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

app.delete("/follow", (req, res) => {
  if (!req.body.follower || !req.body.following) return res.status(400).send();
  FollowController.delete(req.body)
    .then(result => {
      res.status(202).send({ deletedCount: result[1] });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

app.get("/user/:username/followers", (req, res) => {
  var username = req.params.username;
  if (!username) return res.status(400).send();
  FollowController.find({ following: username })
    .then(result => {
      res.status(200).send({
        count: result.length,
        followers: _.map(result, item => {
          return {
            username: item.follower,
            createdAt: item.createdAt
          };
        })
      });
    })
    .catch(error => {
      res.status(500).send({ error });
    });
});

app.get("/user/:username/following", (req, res) => {
  var username = req.params.username;
  if (!username) return res.status(400).send();
  FollowController.find({ follower: username })
    .then(result => {
      res.status(200).send({
        count: result.length,
        following: _.map(result, item => {
          return {
            username: item.following,
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
