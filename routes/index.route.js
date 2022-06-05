const account = require("./account.route");
const messenger = require("./messenger.route");
const post = require("./post.route");
const comment = require("./comment.route");
const like = require("./like.route");
const route = (app) => {
  app.use("/", account);
  app.use("/", messenger);
  app.use("/", post);
  app.use("/", comment);
  app.use("/", like);
};
module.exports = route;
