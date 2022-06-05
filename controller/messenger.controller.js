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
      console.log(req.body);
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
}
module.exports = new Messenger();
