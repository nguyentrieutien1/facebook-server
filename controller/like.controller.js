const likeService = require("./../service/like.service");
class Like {
  createLike = async (req, res) => {
    const { accountId, postId } = req.body;
    const result = await likeService.createLike(accountId, postId);
    return res.json(result);
  };
  // getLike = async (req, res) => {
  //   const result = await likeService.getLike();
  //   return res.json(result);
  // };
}
module.exports = new Like();
