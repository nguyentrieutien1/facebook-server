const router = require("express").Router();
const friendController = require("../controller/friend.controller");
router.post("/friend", friendController.createFriend);
router.get("/friend/:id", friendController.getFriendList);
router.get("/accept/:id", friendController.getAcceptFriend);
router.post("/accept", friendController.handleAcpFriend);
module.exports = router;
