const { DataTypes } = require("sequelize");
const sequelize = require("./../db/connect");
try {
  const Comments = sequelize.define("Comments", {
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
    await Comments.sync();
  })();
  module.exports = Comments;
} catch (error) {
  console.log(error);
}
