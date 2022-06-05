const { DataTypes } = require("sequelize");
const sequelize = require("./../db/connect");
const t = sequelize.transaction();
try {
  const Messengers = sequelize.define("Messengers", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    messenger: {
      type: DataTypes.STRING,
      allowNull: true,
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
    await Messengers.sync();
  })();
  module.exports = Messengers;
} catch (error) {}
