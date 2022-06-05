const router = require("express").Router();
const postController = require("./../controller/post.controller");
router.post("/post/create", postController.createPost);
router.get("/post", postController.getAllPost);
module.exports = router;
