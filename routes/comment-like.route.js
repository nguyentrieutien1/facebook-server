const router = require("express").Router();
const commentLikeController = require("./../controller/comment-like.controller");
router.post("/comment-like", commentLikeController.createCommentLike);
module.exports = router;
