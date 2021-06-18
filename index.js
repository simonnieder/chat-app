const express = require("express");
const socketImpl = require("./socket");
const app = express();
const http = require("http");
const server = http.createServer(app);
const routes = require("./routes");

app.use("/api", routes);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});

socketImpl(io);

server.listen(5000, () => {
  console.log("listening on http://localhost:5000");
});
