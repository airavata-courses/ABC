module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("user", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.DATE
    },
    location: {
      type: DataTypes.STRING
    }
  });

  return User;
};
