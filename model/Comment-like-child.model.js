const { DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const CommentLikesChild = sequelize.define("CommentLikesChilds", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  commentChildId: {
    type: DataTypes.INTEGER,
    references: {
      model: "CommentChildrens",
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
  await CommentLikesChild.sync();
})();
module.exports = CommentLikesChild;
