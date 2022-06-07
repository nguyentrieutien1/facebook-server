const router = require("express").Router();
const CommentChildrenController = require("./../controller/comment-children");
router.post(
  "/comment-children",
  CommentChildrenController.createCommentChildren
);
module.exports = router;
