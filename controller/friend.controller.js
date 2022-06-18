const friendSercice = require("./../service/friend.service");
class FriendController {
  createFriend = async (req, res) => {
    const { myId, friendId } = req.body;
    if (!myId || !friendId) {
      return res.json({ statusCode: 400 });
    }
    const result = await friendSercice.createFriendService({ myId, friendId });
    return res.json(result);
  };
  getFriendList = async (req, res) => {
    const { id } = req.params;
    const result = await friendSercice.getFriendList(id);
    return res.json(result);
  };
  getAcceptFriend = async (req, res) => {
    const { id } = req.params;
    const result = await friendSercice.getAcceptFriend(id);
    return res.json(result);
  };
  handleAcpFriend = async (req, res) => {
    const { myId, friendId } = req.body;
    const result = await friendSercice.handleAcpFriend({ myId, friendId });
    return res.json(result);
  };
}
module.exports = new FriendController();
