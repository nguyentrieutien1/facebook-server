const router = require("express").Router();
const CommentController = require("./../controller/comment.controller");
router.post("/comment", CommentController.createComment);
module.exports = router;
