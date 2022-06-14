const router = require("express").Router();
const messengerController = require("./../controller/messenger.controller");
router.get("/messenger", messengerController.getMessPartner);
router.get("/count-mess/:id", messengerController.countMess);
router.put(
  "/update-all-mess/:myId/:friendId",
  messengerController.hanldeUpdateAllMess
);
router.get("/messenger-list/:myId", messengerController.getMessList);
router.post("/messenger", messengerController.createMess);
router.put("/mess/update/:id", messengerController.updateSeenMess);
module.exports = router;
