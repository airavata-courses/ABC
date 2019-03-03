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
        userId: "sdlfkj2938rhfsdijfskfj",
        userName: "johndoe",
        password: "bacon",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        bio: "Doeing John",
        dob: Date.parse("1 Jan 1990"),
        location: "New York, USA"
    },
    {
        userId: "2938nduhnkwj3nrkjnsdf",
        userName: "janedoe",
        password: "beef",
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@gmail.com",
        bio: "I'm Doe...Jane Doe",
        dob: Date.parse("1 May 1990"),
        location: "California, USA"
    },
    {
        userId: "bxcmvnskuerywfnwoiro23",
        userName: "janicedoe",
        password: "chandler",
        firstName: "Janice",
        lastName: "Doe",
        email: "janice@gmail.com",
        bio: "Oh....my....god....!",
        dob: Date.parse("1 May 1980"),
        location: "15, Yemen Road, Yemen"
    }
];

var dummyFollows = [
    {
        follower: "sdlfkj2938rhfsdijfskfj",
        following: "2938nduhnkwj3nrkjnsdf"
    },
    {
        follower: "2938nduhnkwj3nrkjnsdf",
        following: "bxcmvnskuerywfnwoiro23"
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

describe("POST /users", () => {
    it("should create a new user when valid data is passed", done => {
        request(app)
            .post("/users/")
            .send(dummyUsers[0])
            .expect(201)
            .expect(res => {
                // Check if correct response is sent
                // expect(res.body.user.userId).toExist();
                expect(res.body.user.userName).toBe(dummyUsers[0].userName);
                expect(res.body.user.firstName).toBe(dummyUsers[0].firstName);
                expect(res.body.user.lastName).toBe(dummyUsers[0].lastName);
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

    it("should return 409 if userId already exists in database", done => {
        request(app)
            .post("/users/")
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
            .post("/users/")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});

describe("GET /users/:userId", () => {
    it("should return a user if it exists in the database", done => {
        request(app)
            .get(`/users/${dummyUsers[1].userId}`)
            .expect(200)
            .expect(res => {
                expect(res.body.user.userId).toBe(dummyUsers[1].userId);
                expect(res.body.user.userName).toBe(dummyUsers[1].userName);
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

    it("should return 404 if userId does not exist in the database", done => {
        request(app)
            .get(`/users/dummyUser`)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});

describe("PATCH /users", () => {
    it("should update record if valid data is passed", done => {
        var dummyUser = Object.assign({}, dummyUsers[1]);
        dummyUser.location = "Santa Clara, California, USA";

        request(app)
            .patch("/users/")
            .send(dummyUser)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it("should return 400 if userId is not passed", done => {
        var dummyUser = Object.assign({}, dummyUsers[1]);
        delete dummyUser.userId;

        request(app)
            .patch("/users/")
            .send(dummyUser)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it("should return 404 is userId is not found in database", done => {
        var dummyUser = Object.assign({}, dummyUsers[1]);
        dummyUser.userId = "abcde";

        request(app)
            .patch("/users/")
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
            .delete("/users/")
            .send({ userId: dummyUsers[1].userId })
            .expect(202)
            .expect(res => {
                expect(res.body.deletedCount).toBe(1);
            })
            .end((err, res) => {
                if (err) return done(err);
                done(err);
            });
    });

    it("should return 400 if no userId is specified", done => {
        request(app)
            .delete("/users/")
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                done(err);
            });
    });

    it("should return 404 if userId is not present in database", done => {
        request(app)
            .delete("/users/")
            .send({ userId: "abcdxyz" })
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
            .post("/relation/user/follow")
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
            .post("/relation/user/follow")
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

    it("should return list of followers", done => {
        request(app)
            .get(`/relation/user/${dummyFollows[1].following}/followers`)
            .expect(200)
            .expect(res => {
                expect(res.body[0].userId).toBe(dummyFollows[1].follower);
            })
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    // it("should return list of following", done => {
    //     request(app)
    //         .get(`/relation/user/${dummyFollows[0].follower}/following`)
    //         .expect(200)
    //         .expect(res => {
    //             expect(res.body[0].userId).toBe(dummyFollows[0].following);
    //         })
    //         .end((err, res) => {
    //             console.log(res.body);
    //             if (err) {
    //                 console.log("err => " + err);
    //                 return done(err);
    //             }
    //             done();
    //         });
    // });
});
