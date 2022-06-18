const { DataTypes } = require("sequelize");
const sequelize = require("./../db/connect");
const time = require("./../helpers/format_time");
const Friend = sequelize.define("Friend", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  accept: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: time(),
  },
  myId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Accounts",
      key: "id",
    },
  },
  friendId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Accounts",
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("NOW()"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("NOW()"),
  },
});

(async () => {
  await Friend.sync();
})();
module.exports = Friend;
