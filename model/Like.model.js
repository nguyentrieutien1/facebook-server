const { DataTypes } = require("sequelize");
const sequelize = require("./../db/connect");
const Likes = sequelize.define("Likes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  like: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Posts",
      key: "id",
    },
  },
  accountId: {
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
  await Likes.sync();
})();
module.exports = Likes;
