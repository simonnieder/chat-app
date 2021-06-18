const express = require("express");
const cors = require("cors");
const session = require("express-session");

const router = express.Router();
const user = require("./user");
const chat = require("./chat");

router.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

router.use(
  session({
    secret: "chatapp",
    path: "/",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  })
);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use("/user", user);
router.use("/chat", chat);

module.exports = router;
