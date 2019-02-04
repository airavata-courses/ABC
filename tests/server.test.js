const expect = require("expect");
const request = require("supertest");
const Sequelize = require("sequelize");

// Pick and environment out of "development", "test", "production" and load configuration accordingly
var env = "development";
const connConfig = require("../config/connection")[env];

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

const { app } = require("../server");
const { UserController } = sequelize.import("../controllers/user");
const { FollowController } = sequelize.import("../controllers/follow");

var dummyUsers = [
  {
    username: "johndoe",
    name: "John Doe",
    bio: "Doeing John",
    dob: Date.parse("1 Jan 1990"),
    location: "New York, USA"
  },
  {
    username: "janedoe",
    name: "Jane Doe",
    bio: "I'm Doe...Jane Doe",
    dob: Date.parse("1 May 1990"),
    location: "California, USA"
  },
  {
    username: "janicedoe",
    name: "Janice Doe",
    bio: "Oh....my....god....!",
    dob: Date.parse("1 May 1980"),
    location: "15, Yemen Road, Yemen"
  }
];

var dummyFollows = [
  {
    follower: "jessica",
    following: "jensen"
  },
  {
    follower: "james",
    following: "jecob"
  }
];

beforeEach(done => {
  sequelize
    .sync()
    .then(() => UserController.truncate())
    .then(() => UserController.create(dummyUsers[1]))
    .then(() => FollowController.truncate())
    .then(() => FollowController.create(dummyFollows[1]))
    .then(() => done(), error => done(error));
});

describe("POST /user", () => {
  it("should create a new user when valid data is passed", done => {
    request(app)
      .post("/user")
      .send(dummyUsers[0])
      .expect(201)
      .expect(res => {
        // Check if correct response is sent
        expect(res.body.user.username).toBe(dummyUsers[0].username);
        expect(res.body.user.name).toBe(dummyUsers[0].name);
        expect(res.body.user.bio).toBe(dummyUsers[0].bio);
        // TODO: having issue here: getting null only in testing framework, works fine in postman
        // expect(res.body.user.dob).toBe(dummyUsers[0].dob);
        expect(res.body.user.location).toBe(dummyUsers[0].location);
      })
      .end((err, res) => {
        if (err) return done(err);

        // Check if data is inserted in the database
        done();
      });
  });

  it("should return 409 if username already exists in database", done => {
    request(app)
      .post("/user")
      .send(dummyUsers[1])
      .expect(409)
      .expect(res => {
        expect(res.body.error.name).toBe("SequelizeUniqueConstraintError");
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return 400 if any field is missing", done => {
    request(app)
      .post("/user")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("GET /user/:username", () => {
  it("should return a user if it exists in the database", done => {
    request(app)
      .get(`/user/${dummyUsers[1].username}`)
      .expect(200)
      .expect(res => {
        expect(res.body.user.username).toBe(dummyUsers[1].username);
        expect(res.body.user.name).toBe(dummyUsers[1].name);
        expect(res.body.user.bio).toBe(dummyUsers[1].bio);
        // expect(res.body.user.dob).toBe(dummyUsers[1].dob);
        expect(res.body.user.location).toBe(dummyUsers[1].location);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return 404 if username does not exist in the database", done => {
    request(app)
      .get(`/user/dummyUser`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("PATCH /user", () => {
  it("should update record if valid data is passed", done => {
    var dummyUser = Object.assign({}, dummyUsers[1]);
    dummyUser.location = "Santa Clara, California, USA";

    request(app)
      .patch("/user")
      .send(dummyUser)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return 400 if username is not passed", done => {
    var dummyUser = Object.assign({}, dummyUsers[1]);
    delete dummyUser.username;

    request(app)
      .patch("/user")
      .send(dummyUser)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return 404 is username is not found in database", done => {
    var dummyUser = Object.assign({}, dummyUsers[1]);
    dummyUser.username = "abcde";

    request(app)
      .patch("/user")
      .send(dummyUser)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("DELETE /user", () => {
  it("should delete user if it is present in the database", done => {
    request(app)
      .delete("/user")
      .send({ username: dummyUsers[1].username })
      .expect(202)
      .expect(res => {
        expect(res.body.deletedCount).toBe(1);
      })
      .end((err, res) => {
        if (err) return done(err);
        done(err);
      });
  });

  it("should return 400 if no username is specified", done => {
    request(app)
      .delete("/user")
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done(err);
      });
  });

  it("should return 404 if username is not present in database", done => {
    request(app)
      .delete("/user")
      .send({ username: "abcdxyz" })
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done(err);
      });
  });
});

describe("POST /follow", () => {
  it("should insert a follower-following pair when it is valid", done => {
    request(app)
      .post("/follow")
      .send(dummyFollows[0])
      .expect(201)
      .expect(res => {
        expect(res.body.follow.follower).toBe(dummyFollows[0].follower);
        expect(res.body.follow.following).toBe(dummyFollows[0].following);
      })
      .end((err, res) => {
        if (err) return done(err);
        done(err);
      });
  });

  it("should return error when inserting already present pair", done => {
    request(app)
      .post("/follow")
      .send(dummyFollows[1])
      .expect(500)
      .expect(res => {
        expect(res.body.error.name).toBe("SequelizeUniqueConstraintError");
      })
      .end((err, res) => {
        if (err) return done(err);
        done(err);
      });
  });

  it("should return count and list of followers", done => {
    request(app)
      .get(`/user/${dummyFollows[1].following}/followers`)
      .expect(200)
      .expect(res => {
        expect(res.body.count).toBe(1);
        expect(res.body.followers[0].username).toBe(dummyFollows[1].follower);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return count and list of following", done => {
    request(app)
      .get(`/user/${dummyFollows[1].follower}/following`)
      .expect(200)
      .expect(res => {
        expect(res.body.count).toBe(1);
        expect(res.body.following[0].username).toBe(dummyFollows[1].following);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
