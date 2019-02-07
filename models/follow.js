module.exports = (sequelize, DataTypes) => {
  var Follow = sequelize.define("follow", {
    follower: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "follow_relation"
    },
    following: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "follow_relation"
    }
  });

  return Follow;
};
