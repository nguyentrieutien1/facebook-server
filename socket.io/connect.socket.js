const socket = require("socket.io");
module.exports = {
  connect: (server) => {
    const io = socket(server);
    io.on("connection", function (socket) {
      socket.on("join_my_room", (join_my_room) => {
        socket.broadcast.emit("online", join_my_room);
        socket.join(`${join_my_room}`);
      });
      socket.on("join_room", ({ friendId }) => {
        socket.join(`${friendId}`);
      });
      socket.on("tag_comment", (id) => {
        socket.to(`${id}`).emit("tag_comment");
      });
      socket.on("send_mess", ({ messenge, friendId, myId }) => {
        socket.to(`${friendId}`).to(`${myId}`).emit("revice_mess", messenge);
        socket.to(`${myId}`).emit("mess_list_server");
      });
      socket.on("create_post_client", () => {
        socket.emit("create_post_server");
        socket.broadcast.emit("create_post_server");
      });
      socket.on("handle_notify_client", ({ value, className }) => {
        socket.broadcast.emit("handle_notify_server", { value, className });
      });
      socket.on("handle_entering_client", ({ value, friendId }) => {
        socket.to(`${friendId}`).emit("handle_entering_server", { value });
      });

      socket.on("handle_get_back_post", () => {
        socket.broadcast.emit("handle_get_back_post_server");
      });
      socket.on("like_client", () => {
        socket.broadcast.emit("like_server");
      });
      socket.on("comment_children_client", () => {
        console.log("comment_children_client");
        socket.broadcast.emit("comment_children_server");
        socket.emit("comment_children_server");
      });
      socket.on("like_comment_client", () => {
        socket.emit("like_comment_server");
        socket.broadcast.emit("comment_like_child_server");
      });
      socket.on("comment_like_child", () => {
        socket.broadcast.emit("comment_like_child_server");
        socket.emit("comment_like_child_server");
      });
      socket.on("request_addfriend", (friendId) => {
        console.log("request_addfriend");
        socket.to(`${friendId}`).emit("request_addfriend");
      });
      socket.on("handle_acp", (friendId) => {
        console.log(friendId);
        socket.to(`${friendId}`).emit("handle_acp");
      });
      socket.on("delete_request", (id) => {
        socket.to(`${id}`).emit("delete_request");
      });
      socket.on("disconnect", (id) => {});
    });
  },
};
