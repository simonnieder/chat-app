const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();
const connection = require("../database/connection");
const { getUsers } = require("../utlis/users");

router.post("/login", (req, res) => {
  if (req.session.userId) return res.send({ username: req.session.userId });
  if (!req.body.username || !req.body.password)
    return res.status(400).json({ error: "username or password missing!" });
  const username = req.body.username;
  const password = req.body.password;
  const sql = "SELECT `username`, `password` from users WHERE `username` = ?";
  connection.query(sql, [username], function (err, results) {
    if (err || results?.length == 0)
      return res.status(400).json({ error: "Username or password incorrect!" });
    const user = results[0];
    bcrypt.compare(password, user.password, function (err, result) {
      if (!result)
        return res
          .status(400)
          .json({ error: "Username or password incorrect!" });
      req.session.userId = req.body.username;
      req.session.save(() => res.send({ username: user.username }));
    });
  });
});

router.post("/signup", (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email)
    return res
      .status(400)
      .json({ error: "Username, password or email missing!" });
  const sql =
    "INSERT INTO `users` (`username`, `password`, `email`) VALUES(?,?,?)";
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      connection.query(
        sql,
        [req.body.username, hash, req.body.email],
        function (err, results) {
          if (err?.code === "ER_DUP_ENTRY")
            return res.status(400).json({ error: "Username already exists!" });
          req.session.username = req.body.username;
          res.send(req.body.username);
        }
      );
    });
  });
});

router.get("/conversations/:user", (req, res) => {
  const user = req.params.user;
  const sql =
    "SELECT m.content, m.id, latest.username FROM messages m JOIN (SELECT MAX(`id`) AS `id`, CASE WHEN m.from = ? THEN m.to WHEN m.to = ? THEN m.from END AS `username` from messages m GROUP BY `username`) latest on m.id=latest.id GROUP BY `username` HAVING username IS NOT NULL";
  connection.query(sql, [user, user], function (err, results) {
    if (err || results.length === 0)
      return res.status(400).json({ error: "No users found!" });
    let allUsers = [];
    const onlineUsers = getUsers();
    results.map((user) => {
      let online = false;
      if (onlineUsers.find((u) => u.username === user.username)) {
        online = true;
      }
      allUsers.push({
        ...user,
        online: onlineUsers.some((u) => u.username === user.username),
      });
    });
    res.send(allUsers);
  });
});

router.get("/userlist/:user", (req, res) => {
  const user = req.params.user;
  const sql = "SELECT `username` FROM `users` WHERE NOT `username` = ?";
  connection.query(sql, [user], function (err, results) {
    if (err || results.length === 0)
      return res.status(400).json({ error: "No users found!" });
    let allUsers = [];
    const onlineUsers = getUsers();
    results.map((user) => {
      let online = false;
      if (onlineUsers.find((u) => u.username === user.username)) {
        online = true;
      }
      allUsers.push({
        ...user,
        online: onlineUsers.some((u) => u.username === user.username),
      });
    });
    res.send(allUsers);
  });
});

module.exports = router;
