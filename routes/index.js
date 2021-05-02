const express = require("express");

const router = express.Router();
const user = require("./user");
const chat = require("./chat");



router.use("/user", user)
router.use("/chat", chat)
module.exports = router;