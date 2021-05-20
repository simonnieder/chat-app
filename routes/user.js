const express = require("express");
const router = express.Router();
const connection = require("../database/connection")
const { getUsers} = require("../utlis/users")
  
router.post("/login",(req,res)=>{
    if(req.session.userId) return res.send({username: req.session.userId});

    const username = req.body.username;
    const password = req.body.password;
    const sql = "SELECT `username`, `password` from users WHERE `username` = ?";
    connection.query(sql, [username], function(err,results){
        if(err || results?.length == 0) return res.status(400).json({error: "Could not get user from database."})
        const user = results[0];

        if(user.password !== password) return res.sendStatus(400);
        req.session.userId = req.body.username;
        req.session.save(()=>res.send({username: user.username}));

    });
});

router.post("/signup",(req,res)=>{
    if(!req.body.username ||  !req.body.password || !req.body.email) return res.sendStatus(400);
    const sql = "INSERT INTO `users` (`username`, `password`, `email`) VALUES(?,?,?)";
    connection.query(sql, [req.body.username, req.body.password, req.body.email], function(err,results){
        if(err) return res.sendStatus(400);
        req.session.username = req.body.username;
        return res.send(req.body.username);
    });
});

router.get("/online",(req,res)=>{

    res.send(getUsers());
});

router.get("/all/:user", (req, res)=>{
    const user = req.params.user;
    const sql = "SELECT `username` FROM `users` WHERE NOT `username` = ?";
    connection.query(sql, [user], function(err,allUsers){
        if(err) return res.sendStatus(400);
        const sql2 = "SELECT m.content, m.id, latest.username FROM messages m JOIN (SELECT MAX(`id`) AS `id`, CASE WHEN m.from = ? THEN m.to WHEN m.from = ? THEN m.to END AS `username` from messages m GROUP BY `username`) latest on m.id=latest.id GROUP BY `username` HAVING username IS NOT NULL";   
        connection.query(sql2, [user,user], function(err,results){
            if(err || results.length === 0) return res.sendStatus(400);
            const onlineUsers = getUsers();
            console.log(onlineUsers);
            let returnedUsers =[];
            allUsers.map((user)=> {
                const userMessage = results.find((u)=> u.username === user.username);
                let online = false;
                if(onlineUsers.find((u)=> u.username === user.username)){
                    online = true;
                }   
                returnedUsers.push({username: user.username, ...userMessage,  online: online})
            })
            res.send(returnedUsers);
        });
    });
})

router.get("/conversations/:user", (req, res)=>{
    const user = req.params.user;
    const sql = "SELECT m.content, m.id, latest.username FROM messages m JOIN (SELECT MAX(`id`) AS `id`, CASE WHEN m.from = ? THEN m.to WHEN m.from = ? THEN m.to END AS `username` from messages m GROUP BY `username`) latest on m.id=latest.id GROUP BY `username` HAVING username IS NOT NULL";   
    connection.query(sql, [user,user], function(err,results){
        if(err || results.length === 0) return res.sendStatus(400);
        res.send(results);
    });
})

router.get("/:user", (req, res)=>{
    const user = req.params.user;
    const sql = "SELECT `username` FROM `users` WHERE NOT `username` = ?";
    connection.query(sql, [user], function(err,results){
        if(err) return res.sendStatus(400);
        res.send(results);
    });
})


module.exports = router;
