const messengerService = require("../service/messenger.service");
class Messenger {
  getMessPartner = async (req, res) => {
    try {
      const { myId, friendId } = req.query;
      const result = await messengerService.getMessPartner({ myId, friendId });
      return res.json(result);
    } catch (error) {
      console.log(error);
    }
  };
  createMess = async (req, res) => {
    try {
      const { messenger, friendId, myId } = req.body;
      const result = await messengerService.createMess({
        messenger,
        friendId,
        myId,
      });
      return res.json(result);
    } catch (error) {
      console.log(error);
    }
  };
  getMessList = async (req, res) => {
    const { myId } = req.params;
    const result = await messengerService.getMessList(+myId);
    return res.json(result);
  };
  updateSeenMess = async (req, res) => {
    const { id } = req.params;
    const result = await messengerService.updateSeenMess(id);
    return res.json(result);
  };
  countMess = async (req, res) => {
    const { id } = req.params;
    const result = await messengerService.countMess(id);
    return res.json(result);
  };
  hanldeUpdateAllMess = async (req, res) => {
    const { myId, friendId } = req.params;
    const result = await messengerService.hanldeUpdateAllMess(myId, friendId);
    return res.json(result);
  };
}
module.exports = new Messenger();
