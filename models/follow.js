module.exports = (sequelize, DataTypes) => {
  var Follow = sequelize.define("follow", {
    follower: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: "follow_relation"
    },
    following: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: "follow_relation"
    }
  });

  return Follow;
};
