const friendModel = require("./../model/FriendList.model");
const timezone = require("./../helpers/format_time");
const { QueryTypes } = require("sequelize");
const sequelize = require("../db/connect");
const accountModel = require("./../model/Account.model");
class FriendService {
  createFriendService = async ({ myId, friendId }) => {
    try {
      const findFriend = await sequelize.query(
        `SELECT * from friends where myId=${myId} and friendId = ${friendId}`,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      if (findFriend.length > 0) {
        await friendModel.destroy({
          where: {
            myId,
            friendId,
          },
        });
        return {
          statusCode: 200,
        };
      } else {
        console.log("created");
        await friendModel.create({ myId, friendId, time: timezone() });
        return {
          statusCode: 200,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
      };
    }
  };
  getFriendList = async (id) => {
    try {
      const requestList = await sequelize.query(
        `SELECT * FROM friends LEFT JOIN accounts on friends.myId = accounts.id where friendId = ${id} and accept = ${false}`,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      return {
        statusCode: 200,
        requestList,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
      };
    }
  };
  getAcceptFriend = async (id) => {
    try {
      const idList = [];
      const acpList = [];
      const listF = await sequelize.query(
        `SELECT * FROM friends where (friendId = ${id} or myId = ${id}) and accept = ${true}`,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      listF.forEach((acp) => {
        if (id != acp.myId) {
          idList.push(acp.myId);
        }
        if (id != acp.friendId) {
          idList.push(acp.friendId);
        }
      });
      for (const index of idList) {
        const result = await accountModel.findOne({
          where: {
            id: index,
          },
        });
        acpList.push(result);
      }
      return {
        statusCode: 200,
        acpList,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 400,
      };
    }
  };
  handleAcpFriend = async ({ myId, friendId }) => {
    try {
      await friendModel.update(
        {
          accept: true,
        },
        {
          where: {
            myId,
            friendId,
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
  getAddFriendRequest = async ({ id }) => {
    try {
      const result = await sequelize.query(
        `SELECT * FROM friends where myId = ${id} and accept = ${false}`,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );
      return {
        statusCode: 200,
        result,
      };
    } catch (error) {
      return {
        statusCode: 400,
      };
    }
  };
}
module.exports = new FriendService();
