const commentChilModel = require("../model/Comment-children.model");
const time = require("./../helpers/format_time");
class CommentChildren {
  createCommentChildren = async ({ accountId, commentParentId, comment }) => {
    try {
      await commentChilModel.create({
        accountId,
        commentParentId,
        comment,
        time: time(),
      });
      return {
        statusCode: 200,
        message: `Comment successfully !`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `Comment Fail !`,
      };
    }
  };
}
module.exports = new CommentChildren();
