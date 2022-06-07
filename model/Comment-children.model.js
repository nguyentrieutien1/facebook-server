const { DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const CommentChildrens = sequelize.define("CommentChildrens", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  commentParentId: {
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
  await CommentChildrens.sync();
})();
module.exports = CommentChildrens;
