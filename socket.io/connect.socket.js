const socket = require("socket.io");
module.exports = {
  connect: (server) => {
    const io = socket(server);
    io.on("connection", function (socket) {
      socket.on("join_my_room", (join_my_room) => {
        socket.join(`${join_my_room}`);
      });
      socket.on("join_room", ({ myId, friendId }) => {
        socket.join(`${friendId}`);
      });
      socket.on("send_mess", ({ messenge, friendId, myId }) => {
        socket.to(`${friendId}`).to(`${myId}`).emit("revice_mess", messenge);
      });
      socket.on("create_post_client", () => {
        socket.emit("create_post_server");
      });
      socket.on("handle_notify_client", ({ value, className }) => {
        socket.broadcast.emit("handle_notify_server", { value, className });
      });
      socket.on("handle_entering_client", ({ value, friendId }) => {
        console.log(friendId, value);
        socket.to(`${friendId}`).emit("handle_entering_server", { value });
      });
      socket.on("handle_get_back_post", () => {
        socket.broadcast.emit("handle_get_back_post_server");
      });
      socket.on("like_client", () => {
        socket.broadcast.emit("like_server");
      });
    });
  },
};
