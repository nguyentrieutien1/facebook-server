const commentLikeChildService = require("../service/comment-like-child.service");
class CommentLike {
  createCommentLike = async (req, res) => {
    const { commentChildId, accountId } = req.body;
    console.log(commentChildId, accountId);
    const result = await commentLikeChildService.createCommentLikeChild({
      commentChildId,
      accountId,
    });
    return res.json(result);
  };
}
module.exports = new CommentLike();
