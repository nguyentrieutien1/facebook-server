const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("facebook", "root", "nguyenthanhtung", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  retry: [Sequelize.ConnectionError],
});
sequelize.authenticate();
console.log("Connection has been established successfully.");
module.exports = sequelize;
