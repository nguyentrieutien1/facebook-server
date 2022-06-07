const router = require("express").Router();
const messengerController = require("./../controller/messenger.controller");
router.get("/messenger", messengerController.getMessPartner);
router.get("/messenger-list/:myId", messengerController.getMessList);
router.post("/messenger", messengerController.createMess);
module.exports = router;
