const router = require("express").Router();
const postController = require("./../controller/post.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: async (req, file, cb) => {
    console.log(req.files);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post("/post/create", postController.createPost);
router.post(
  "/post/create/images",
  upload.array("picture"),
  postController.createImg
);
router.get("/post", postController.getAllPost);
module.exports = router;
