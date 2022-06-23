const router = require("express").Router();
const accountController = require("./../controller/account.controller");
const multer = require("multer");
const path = require("path");
const accountModel = require("./../model/Account.model");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: async (req, file, cb) => {
    const { id } = req.params;
    cb(null, file.originalname);
    const img = `http://localhost:8000/images/${file.originalname}`;
    await accountModel.update(
      { avatar: img },
      {
        where: {
          id,
        },
      }
    );
    req.avatar = img;
  },
});
const upload = multer({ storage: storage });
router.post("/register", accountController.createAccount);
router.post("/login", accountController.loginAccount);
router.get("/account", accountController.getAllAccount);
router.get("/account/:id", accountController.getDetailAccount);
router.post("/account/forget", accountController.handleForgetPassord);
router.patch("/account/update", accountController.handleUpdateAccount);
router.get("/account/token/:token/:email", accountController.handleVerifyToken);
router.post("/account/confirm", accountController.accountConfirm);
router.put(
  "/account/upload/avatar/:id",
  upload.single("images"),
  accountController.upLoadAvt
);
router.get("/imDages/:id", (req, res) => {
  res.sendFile(path.join(__dirname, +"/" + "images", req.params.id));
});
module.exports = router;
