module.exports = {
  create: async () => {
    require("./Account.model");
    require("./Post.model");
    require("./Comment.model");
    require("./Messenger.model");
    require("./Like.model");
    require("./Comment-children.model");
    require("./Comment-like-child.model");
    console.log(`create table successffuly !`);
    try {
    } catch (error) {
      console.log(error);
    }
  },
};
