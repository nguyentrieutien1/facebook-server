const commentLikeService = require("./../service/comment-like.service");
class CommentLike {
  createCommentLike = async (req, res) => {
    const { commentId, accountId } = req.body;
    const result = await commentLikeService.createCommentLike({
      commentId,
      accountId,
    });
    return res.json(result);
  };
}
module.exports = new CommentLike();
