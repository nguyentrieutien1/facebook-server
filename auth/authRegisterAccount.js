const Joi = require("joi");
module.exports = ({ username, email, password, repassword, sex, address }) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().required(),
    repassword: Joi.ref("password"),
    address: Joi.string().required(),
    sex: Joi.string().required(),
  });
  try {
    return schema.validate({
      username,
      email,
      password,
      repassword,
      sex,
      address,
    });
  } catch (error) {
    return error;
  }
};
