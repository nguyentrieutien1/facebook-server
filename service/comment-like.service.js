const commentLikeModel = require("../model/Comment-like.model");
class CommentLike {
  createCommentLike = async ({ commentId, accountId }) => {
    console.log(commentId, accountId);
    try {
      const like = await commentLikeModel.findOne({
        where: {
          commentId,
          accountId,
        },
      });
      if (!like) {
        await commentLikeModel.create({ commentId, accountId });
      } else {
        await commentLikeModel.destroy({
          where: {
            commentId,
            accountId,
          },
        });
      }
      return {
        statusCode: 200,
      };
    } catch (error) {
      return {
        statusCode: 4000,
      };
    }
  };
}
module.exports = new CommentLike();
