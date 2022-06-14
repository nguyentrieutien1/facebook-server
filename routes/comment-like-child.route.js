const router = require("express").Router();
const commentLikeChildController = require("./../controller/comment-like-child.controller");
router.post(
  "/comment-like-child",
  commentLikeChildController.createCommentLike
);
module.exports = router;
