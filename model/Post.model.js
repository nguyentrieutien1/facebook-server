const { DataTypes } = require("sequelize");
const sequelize = require("./../db/connect");
const Accounts = require("./Account.model");
try {
  const Posts = sequelize.define("Posts", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    postContent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time: { type: DataTypes.STRING, allowNull: true },
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
    await Posts.sync();
  })();
  Posts.associate = (models) => {
    Posts.belongsTo(models.Accounts, { as: "posts", foreginKey: "idAccount" });
  };
  module.exports = Posts;
} catch (error) {
  console.log(error);
}
