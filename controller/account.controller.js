const { equal } = require("joi");
const accountService = require("./../service/account.service");
const jwt = require("jsonwebtoken");
const path = require("path");
const accountModel = require("./../model/Account.model");
const authPassword = require("../auth/hashPassword");
const hashPassword = require("../auth/hashPassword");

class Account {
  createAccount = async (req, res) => {
    try {
      const { username, email, password, repassword, sex, address } = req.body;
      const result = await accountService.createAccount({
        username,
        email,
        password,
        repassword,
        sex,
        address,
      });

      return res.json(result);
    } catch (error) {
      console.log(error);
    }
  };
  loginAccount = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await accountService.loginAccount({ email, password });
      return res.json(result);
    } catch (error) {
      console.log(error);
    }
  };
  getAllAccount = async (req, res) => {
    try {
      const result = await accountService.getAllAccount();
      return res.json(result);
    } catch (error) {
      console.log(error);
    }
  };
  getDetailAccount = async (req, res) => {
    try {
      const id = req.params?.id;
      const resut = await accountService.getDetailAccount(id);
      return res.json(resut);
    } catch (error) {
      console.log(error);
    }
  };
  upLoadAvt = async (req, res) => {
    console.log(req.avatar);
    try {
      return res.json({ statusCode: 200 });
    } catch (error) {
      console.log(error);

      return res.json({ statusCode: 400 });
    }
  };
  handleForgetPassord = async (req, res) => {
    const { email } = req.body;
    const result = await accountService.handleForgetPassord(email);
    return res.json(result);
  };
  handleVerifyToken = async (req, res) => {
    const { token, email } = req.params;
    req.session.email = email;
    const result = jwt.verify(token, "email");
    if (result) {
      return res.sendFile(path.join(__dirname, "./../newPassword.html"));
    } else {
      return res.json({ message: "invalid time, plz try enter again" });
    }
  };
  accountConfirm = async (req, res) => {
    try {
      const { email } = req.session;
      const { newPassword, newPasswordAgain } = req.body;
      console.log(req.body);
      const account = await accountModel.findOne({
        where: {
          email,
        },
      });
      if (newPassword !== newPasswordAgain) {
        return res.json({
          statusCode: 400,
          message: "Password must match RePassword, Plz enter again !",
        });
      } else {
        const newPass = await hashPassword.hash(newPassword);
        await accountModel.update(
          {
            password: newPass,
          },
          {
            where: {
              email,
            },
          }
        );
        return res.json({
          statusCode: 200,
          message: "Update password successfully !!!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleUpdateAccount = async (req, res) => {
    try {
      let { password, sex, address, email, username } = req.body;
      password = await hashPassword.hash(password);
      await accountModel.update(
        {
          password,
          sex,
          address,
          username,
        },
        {
          where: {
            email,
          },
        }
      );
      return res.json({
        statusCode: 200,
        message: `Update Account Successfully !`,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        statusCode: 400,
        message: "Update Account Fail !!!",
      });
    }
  };
}
module.exports = new Account();
