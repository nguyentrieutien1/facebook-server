const commentChildrenService = require("./../service/comment-children");
class CommentChildren {
  createCommentChildren = async (req, res) => {
    const { accountId, commentParentId, comment } = req.body;
    const result = await commentChildrenService.createCommentChildren({
      accountId,
      commentParentId,
      comment,
    });
    return res.json(result);
  };
}
module.exports = new CommentChildren();
