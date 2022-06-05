const { QueryTypes } = require("sequelize");
const sequelize = require("../db/connect");
const MessengerModel = require("./../model/Messenger.model");
class Messenger {
  getMessPartner = async ({ myId, friendId }) => {
    try {
      const result = await sequelize.query(
        `SELECT * FROM messengers inner join accounts on accounts.id= messengers.myId   WHERE  (messengers.myId=${friendId} and messengers.friendId=${myId}) or (messengers.myId=${myId} and messengers.friendId=${friendId})  ORDER BY messengers.id `,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  createMess = async ({ messenger, friendId, myId }) => {
    console.log(messenger, friendId, myId);
    try {
      await MessengerModel.create({ messenger, friendId, myId });
      return {
        statusCode: 200,
        message: `create messenger successfully !`,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: `create messenger fail !`,
      };
    }
  };
}
module.exports = new Messenger();
