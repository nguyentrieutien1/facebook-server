const commentService = require("../service/comment.service");

class CommentController {
  createComment = async (req, res) => {
    const { postId, accountId, comment } = req.body;
    const result = await commentService.createComment({
      postId,
      accountId,
      comment,
    });
    setTimeout(() => {
      return res.json(result);
    }, 2000);
  };
}
module.exports = new CommentController();
