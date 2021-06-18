const connection = require("../database/connection");
const { userJoin, getUserByUsername, userLeave } = require("../utlis/users");

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("login", (username, onSubmit) => {
      if (getUserByUsername(username)) return onSubmit("Logout first!");
      userJoin(socket.id, username);
      socket.broadcast.emit("user-state-change", {
        username: username,
        online: true,
      });
    });
    socket.on("send-message", (message) => {
      const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
      const receiver = getUserByUsername(message.to);
      const sender = getUserByUsername(message.from);
      if (sender) {
        io.to([sender.id]).emit("incoming-message", {
          content: message.content,
          from: message.from,
          to: message.to,
          timestamp: timestamp,
        });
      }
      if (receiver) {
        io.to([receiver.id]).emit("incoming-message", {
          content: message.content,
          from: message.from,
          to: message.to,
          timestamp: timestamp,
        });
      }
      const sql =
        "INSERT INTO `messages` (`content`, `from`, `to`, `timestamp`) VALUES(?, ?, ?, ?)";
      connection.query(
        sql,
        [message.content, message.from, message.to, timestamp],
        function (err, results) {}
      );
    });
    socket.on("disconnect", () => {
      const username = userLeave(socket.id)?.username;
      if (!username) return;
      socket.broadcast.emit("user-state-change", {
        username: username,
        online: false,
      });
    });
  });
};
