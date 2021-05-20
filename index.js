const express = require("express");
const session = require("express-session");
const connection = require("./database/connection")
const app = express();
const http = require('http');
const cors = require("cors");
const server = http.createServer(app);
const routes = require("./routes");
const {  
  userJoin,
  getUserById,
  getUserByUsername,
  userLeave,
} = require("./utlis/users")
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
  },
  allowEIO3: true
});

app.use(cors({
  origin: "http://localhost:3000",
  methods:['GET','POST','PUT','DELETE'],
  credentials: true,
  exposedHeaders: ["set-cookie"],
}));


app.use(
  "/api",
  session({
    secret: "chatapp",
    path    : '/',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api", routes)




io.on('connection', (socket) => {
    socket.on("login", (username)=>{
      userJoin(socket.id, username);
      // socket.broadcast.emit("user-online", username);
    });
    socket.on("send-message", (message)=> {
      const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const receiver = getUserByUsername(message.to);
      const sender = getUserByUsername(message.from);
      if(sender){
        io.to([sender.id]).emit("incoming-message", {
          content: message.content,
          from: message.from,
          to: message.to,
          timestamp: timestamp
        });
      }
      if(receiver){
        io.to([receiver.id]).emit("incoming-message", {
          content: message.content,
          from: message.from,
          to: message.to,
          timestamp: timestamp
        });
      }
      const sql = "INSERT INTO `messages` (`content`, `from`, `to`, `timestamp`) VALUES(?, ?, ?, ?)"
      connection.query(sql, [message.content, message.from, message.to, timestamp], function(err, results){
      });
    });
    socket.on("disconnect", ()=>{
      const username = userLeave(socket.id)?.username;
      if(!username)return;
      socket.broadcast.emit("user-offline", username);
    });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});