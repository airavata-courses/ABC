const _ = require("lodash");
const uuidv4 = require("uuid/v4");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.import("../models/user");

  // UserController is a set of functions that help manipulate 'users' collection
  UserController = {
    // This methods takes only essential parameters from incoming json object and tries to save it on database.
    // Returns a promise
    create: params => {
      return User.create({
        userId: uuidv4(),
        userName: params.userName,
        name: params.name,
        bio: params.bio,
        dob: Date.parse(params.dob),
        location: params.location
      });
    },

    // Returns a promise with result
    // If no records are matched returns an empty array
    find: params => {
      return User.findAll({ where: params });
    },

    update: params => {
      return User.update(params, {
        where: { userId: params.userId },
        returning: true
      });
    },

    delete: params => {
      return User.destroy({ where: { userId: params.userId } });
    },

    // Deletes all the records from 'users' collection. Does not delete the table
    truncate: () => {
      return User.destroy({
        where: {},
        truncate: true
      });
    }
  };

  return {
    UserController
  };
};
