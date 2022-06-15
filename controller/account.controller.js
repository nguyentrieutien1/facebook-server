const accountService = require("../service/account.service");

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
      req.session.account = { email, password };
      req.session.save(() => {});
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
    try {
      return res.json({ statusCode: 200 });
    } catch (error) {
      console.log(error);

      return res.json({ statusCode: 400 });
    }
  };
}
module.exports = new Account();
