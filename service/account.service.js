const authPassword = require("../auth/hashPassword");
const Accounts = require("../model/Account.model");
const auth = require("../auth/authRegisterAccount");
const postService = require("./../service/post.service");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
class AccountService {
  createAccount = async ({
    username,
    email,
    password,
    repassword,
    sex,
    address,
  }) => {
    try {
      const result = await auth({
        username,
        email,
        password,
        repassword,
        sex,
        address,
      });
      if (result.error) {
        return {
          statusCode: 400,
          message: result.error.details[0].message,
        };
      }
      const account = await Accounts.findOne({ where: { email } });
      if (account) {
        return {
          statusCode: 400,
          message: `Tài khoản này đã được dùng rồi cha, đăng kí cái khác giùm !`,
        };
      }
      const hash = await authPassword.hash(password);
      password = hash;
      await Accounts.create({
        username,
        email,
        password,
        repassword,
        sex,
        address,
      });
      return {
        statusCode: 200,
        message: `Good job, đăng kí được rồi đó :))`,
      };
    } catch (error) {
      console.log(error);
    }
  };
  loginAccount = async ({ email, password }) => {
    try {
      const account = await Accounts.findOne({ where: { email } });
      if (!account) {
        return {
          statusCode: 400,
          message: `Sai email rồi kìa, t tức mà t viết tiếng việt luôn á`,
        };
      }
      console.log(account);
      const isComfimPassword = await authPassword.compare(
        password,
        account.password
      );
      if (!isComfimPassword) {
        return {
          statusCode: 400,
          message: `Sai password rồi kìa, t tức mà t viết tiếng việt luôn á`,
        };
      }
      return {
        statusCode: 200,
        message: `Ơn trời cuối cùng cũng nhớ username với password =)))))))))))`,
        account,
      };
    } catch (error) {
      console.log(error);
    }
  };
  getAllAccount = async () => {
    try {
      const accounts = await Accounts.findAll();
      return {
        statusCode: 200,
        accounts,
      };
    } catch (error) {
      console.log(error);
    }
  };
  getDetailAccount = async (id) => {
    try {
      const account = await Accounts.findOne({ where: { id } });
      if (!account) {
        return {
          statusCode: 400,
          message: `Account Not Found Há Há`,
        };
      }
      const postList = await postService.getAllPost();
      const myPost = postList.postList.filter((post) => post.accountId === +id);
      return {
        account,
        postList: myPost,
      };
    } catch (error) {
      console.log(error);
    }
  };
  handleForgetPassord = async (email) => {
    try {
      const account = await Accounts.findOne({
        where: {
          email,
        },
      });
      if (!account) {
        return {
          statusCode: 400,
          message: "Account not fount !",
        };
      }
      const tokenEmail = jwt.sign({ email }, "email", { expiresIn: "1h" });
      console.log(tokenEmail);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tientrieu10111@gmail.com",
          pass: "llixrvuwwrinjzvz",
        },
      });

      var mailOptions = {
        from: "tientrieu10111@gmail.com",
        to: email,
        subject: "Sending Email using Node.js",
        html: `<a href="http://localhost:8000/account/token/${tokenEmail}/${email}">Hello World</a>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return {
        statusCode: 200,
        message: `Open email to check link confirm !`,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
        message: `=)))))))))))))))`,
      };
    }
  };
}
module.exports = new AccountService();
