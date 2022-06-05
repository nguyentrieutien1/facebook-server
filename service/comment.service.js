const CommentModel = require("./../model/Comment.model");
const time = require("./../helpers/format_time");
class CommentService {
  createComment = async ({ postId, accountId, comment }) => {
    const times = time();
    try {
      await CommentModel.create({ comment, accountId, postId, time: times });
      return {
        statusCode: 200,
        message: `commented`,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        message: `error `,
      };
    }
  };
}
module.exports = new CommentService();
