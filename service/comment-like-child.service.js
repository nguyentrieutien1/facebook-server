const commentLikeChildModel = require("../model/Comment-like-child.model");
class CommentLike {
  createCommentLikeChild = async ({ commentChildId, accountId }) => {
    try {
      const like = await commentLikeChildModel.findOne({
        where: {
          commentChildId,
          accountId,
        },
      });
      if (!like) {
        await commentLikeChildModel.create({ commentChildId, accountId });
      } else {
        await commentLikeChildModel.destroy({
          where: {
            commentChildId,
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
