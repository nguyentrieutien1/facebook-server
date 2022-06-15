const postService = require("../service/post.service");

class PostController {
  createPost = async (req, res) => {
    console.log("req.body", req.body);
    try {
      const { status, postContent, accountId, images } = req.body;
      const result = await postService.createPost({
        status,
        postContent,
        accountId,
        images,
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
  createImg = async (req, res) => {
    return res.json({ statusCode: 200 });
  };
}
module.exports = new PostController();
