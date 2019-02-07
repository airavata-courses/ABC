module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.import("../models/follow");

  // UserController is a set of functions that help manipulate 'follow' collection
  FollowController = {
    // This methods takes only essential parameters from incoming json object and tries to save it on database.
    // Returns a promise
    create: params => {
      return Follow.create({
        follower: params.follower,
        following: params.following
      });
    },

    // Returns a promise with result
    // If no records are matched returns an empty array
    find: params => {
      return Follow.findAll({ where: params });
    },

    delete: params => {
      return Follow.destroy({ where: params });
    },

    // Deletes all the records from 'follow' collection. Does not delete the table
    truncate: () => {
      return Follow.destroy({
        where: {},
        truncate: true
      });
    }
  };

  return {
    FollowController
  };
};
