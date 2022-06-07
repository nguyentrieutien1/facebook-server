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
  getMessList = async (myId) => {
    console.log("myId", myId);
    const messegerList = await sequelize.query(
      `SELECT * ,accounts.id as accountId FROM messengers LEFT JOIN accounts on messengers.myId = accounts.id or  messengers.friendId = accounts.id where messengers.myId = ${myId} or messengers.friendId = ${myId}`,
      {
        type: QueryTypes.SELECT,
        nest: true,
      }
    );
    // const listFriendId = [];
    // messegerList.filter((mess) => {
    //   listFriendId.push(mess.myId);
    //   listFriendId.push(mess.friendId);
    // });
    // const setListFriend = new Set(listFriendId);
    // const filterListFriendId = Array.from(setListFriend);
    // const messObj = {};
    // filterListFriendId.forEach((id) => {
    //   if (id !== myId) {
    //     const mess = messegerList.filter((messengers) => {
    //       if()
    //       return (
    //         (messengers.myId === id && messengers.friendId === myId) ||
    //         (messengers.myId === myId && messengers.friendId === id)
    //       );
    //     });
    //     messObj[id] = mess[mess.length - 1];
    //   }
    // });
    return messObj;
  };
}
module.exports = new Messenger();
