module.exports = {
  create: async () => {
    require("./Account.model");
    require("./Messenger.model");
    require("./Post.model");
    require("./Comment.model");
    require("./Like.model");
    console.log(`create table successffuly !`);
    try {
    } catch (error) {
      console.log(error);
    }
  },
};
