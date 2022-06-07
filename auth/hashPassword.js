const bcrypt = require("bcryptjs");
module.exports = {
  hash: async (password) => {
    return await bcrypt.hashSync(password, 10);
  },
  compare: async (password, comparePassword) => {
    return await bcrypt.compare(password, comparePassword);
  },
};
