const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  database: "dt6c22e0bbmna",
  username: "evwobocyrrdapa",
  password: "245ae899a71b01922a512a061892b6e1e65cf808ee0b2ef729070b8d6cc27386",
  host: "ec2-34-231-221-151.compute-1.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
  logging: false,
});
module.exports = sequelize;
