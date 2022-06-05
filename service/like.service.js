const likeModel = require("./../model/Like.model");
class LikeService {
  createLike = async (accountId, postId) => {
    console.log(accountId, postId);
    try {
      const like = await likeModel.findOne({
        where: {
          accountId,
          postId,
        },
      });
      if (like) {
        await likeModel.destroy({
          where: {
            accountId,
            postId,
          },
        });
      } else {
        await likeModel.create({ accountId, postId, like: true });
      }
      return {
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
      };
    }
  };
  // getLike = async () => {
  //   const likeList = await likeModel.findAll();
  // };
}
module.exports = new LikeService();
