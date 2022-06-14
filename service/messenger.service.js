const { QueryTypes } = require("sequelize");
const sequelize = require("../db/connect");
const MessengerModel = require("./../model/Messenger.model");
const format_time = require("./../helpers/format_time");
class Messenger {
  getMessPartner = async ({ myId, friendId }) => {
    try {
      const result = await sequelize.query(
        `SELECT * , messengers.id as messengerId FROM messengers inner join accounts on accounts.id= messengers.myId   WHERE  (messengers.myId=${friendId} and messengers.friendId=${myId}) or (messengers.myId=${myId} and messengers.friendId=${friendId})  ORDER BY messengers.id `,
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
    try {
      await MessengerModel.create({
        messenger,
        friendId,
        myId,
        time: format_time(),
      });
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
    if (myId) {
      const messegerList = await sequelize.query(
        `SELECT *  FROM messengers  where messengers.myId = ${myId} or messengers.friendId = ${myId}`,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      const accountList = await sequelize.query(`SELECT *  FROM accounts`, {
        type: QueryTypes.SELECT,
        nest: true,
      });
      const listFriendId = [];
      messegerList.filter((mess) => {
        listFriendId.push(mess.myId);
        listFriendId.push(mess.friendId);
      });
      const setListFriend = new Set(listFriendId);
      const filterListFriendId = Array.from(setListFriend);
      const messObj = {};
      filterListFriendId.forEach((id) => {
        if (id !== myId) {
          const mess = messegerList.filter((messengers) => {
            return (
              (messengers.myId === id && messengers.friendId === myId) ||
              (messengers.myId === myId && messengers.friendId === id)
            );
          });
          const account = accountList.filter((acc) => {
            return acc.id === id;
          });
          const messenger = mess[mess.length - 1];
          messenger.account = account[0];
          messObj[id] = messenger;
        } else {
          const mess = messegerList.filter((messengers) => {
            return messengers.myId === myId && messengers.friendId === myId;
          });
          const account = accountList.filter((acc) => {
            return acc.id === myId;
          });
          let messenger = {};
          if (mess.length >= 1) {
            messenger = mess[mess.length - 1];
            messenger.account = account[0];
            messObj[id] = messenger;
          }
        }
      });
      return messObj;
    }
  };
  updateSeenMess = async (id) => {
    try {
      await MessengerModel.update(
        {
          seen: true,
        },
        {
          where: {
            id,
          },
        }
      );
      return {
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
      };
    }
  };
  countMess = async (id) => {
    const result = await this.getMessList(+id);
    const arr = [];
    for (const key in result) {
      arr.push(result[key]);
    }
    return arr.filter((arr) => arr.seen == false && arr.friendId === +id)
      .length;
  };
  hanldeUpdateAllMess = async (myId, friendId) => {
    const result = await this.getMessPartner({ myId, friendId });
    if (result.length > 0) {
      const data = result;
      const friendList = data.filter((data) => {
        return data.friendId !== +friendId;
      });
      if (friendList.length > 0) {
        const { messengerId } = friendList[friendList.length - 1];
        await MessengerModel.update(
          { seen: true },
          {
            where: {
              id: messengerId,
            },
          }
        );
      }
    }
  };
}
module.exports = new Messenger();
