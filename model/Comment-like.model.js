const { DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const CommentLikes = sequelize.define("CommentLikes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  commentId: {
    type: DataTypes.INTEGER,
    references: {
      model: "comments",
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
  await CommentLikes.sync();
})();
module.exports = CommentLikes;
