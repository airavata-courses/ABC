const express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
var cors = require("cors");
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
app.use(cors());

// user create, get, update, delete routes
app.post("/user", (req, res) => {
  params = _.pick(req.body, [
    "userName",
    "password",
    "firstName",
    "lastName",
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
  UserController.create(req.body)
    .then(user => {
      delete user.dataValues.password;
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

app.post("/user/search", (req, res) => {
  var searchQuery = req.body.searchQuery;
  var userId = req.body.userId;
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

app.get("/user/:userId", (req, res) => {
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

app.patch("/user", (req, res) => {
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

app.delete("/user", (req, res) => {
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

  // FollowController.find({ following: userId })
  //   .then(result => {
  //     res
  //       .set("Authorization", "Bearer fake-jwt-token")
  //       .status(200)
  //       .send(
  //         _.map(result, item => {
  //           return {
  //             userId: item.follower,
  //             firstName: item.firstName,
  //             lastName: item.lastName,
  //             createdAt: item.createdAt
  //           };
  //         })
  //       );
  //   })
  //   .catch(error => {
  //     res.status(500).send({ error });
  //   });
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

  // FollowController.find({ follower: userId })
  //   .then(result => {
  //     res
  //       .set("Authorization", "Bearer fake-jwt-token")
  //       .status(200)
  //       .send(
  //         _.map(result, item => {
  //           return {
  //             userId: item.following,
  //             firstName: item.firstName,
  //             lastName: item.lastName,
  //             createdAt: item.createdAt
  //           };
  //         })
  //       );
  //   })
  //   .catch(error => {
  //     res.status(500).send({ error });
  //   });
});
// end of follow routes

// // user search route
// app.get("/user/search/:searchQuery", (req, res) => {
//   var searchQuery = req.params.searchQuery;
//   console.log(searchQuery);

//   if (!searchQuery)
//     return res
//       .status(400)
//       .send({ error: { name: "searchQuery is not specified" } });
//   UserController.find({
//     userName: { [Sequelize.Op.like]: "%" + searchQuery + "%" }
//   })
//     .then(searchResult => {
//       searchResult.forEach(result => {
//         delete result.dataValues.password;
//         result.dataValues.following = true;
//       });
//       res
//         .set("Authorization", "Bearer fake-jwt-token")
//         .status(200)
//         .send(searchResult);
//     })
//     .catch(error => {
//       res.status(500).send({ error });
//     });
// });
// end of user search route

// login
app.post("/user/login", (req, res) => {
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
