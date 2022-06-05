const postService = require("../service/post.service");

class PostController {
  createPost = async (req, res) => {
    try {
      const { status, postContent, accountId } = req.body;
      const result = await postService.createPost({
        status,
        postContent,
        accountId,
      });
      setTimeout(() => {
        return res.json(result);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  getAllPost = async (req, res) => {
    const result = await postService.getAllPost();
    return res.json(result);
  };
}
module.exports = new PostController();
