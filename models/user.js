module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("user", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
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
