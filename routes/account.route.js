const router = require("express").Router();
const accountController = require("./../controller/account.controller");
router.post("/register", accountController.createAccount);
router.post("/login", accountController.loginAccount);
router.get("/account", accountController.getAllAccount);
router.get("/account/:id", accountController.getDetailAccount);
module.exports = router;
