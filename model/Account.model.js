const { DataTypes } = require("sequelize");
const sequelize = require("./../db/connect");
const Messengers = require("./Messenger.model");

const Accounts = sequelize.define(
  "Accounts",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      // allowNull defaults to true
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
      // allowNull defaults to true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue:
        "https://i.pinimg.com/236x/39/e6/0c/39e60c730adc60156971d857dad8cc96.jpg",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
  },
  {
    // Other model options go here
  }
);

(async () => {
  await Accounts.sync({ alter: true });
})();
Accounts.associate = (models) => {
  Accounts.hasMany(models.Posts, { as: "posts", foreginKey: "idAccounts" });
};

module.exports = Accounts;
