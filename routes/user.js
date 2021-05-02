const express = require("express");
const router = express.Router();
const connection = require("../database/connection")

  
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
    if(!req.body.username ||  !req.body.password || !req.body.firstname || !req.body.lastname) return res.sendStatus(400);
    const sql = "INSERT INTO `users` (`username`, `password`, `firstname`, `lastname`) VALUES(?,?,?,?)";
    connection.query(sql, [req.body.username, req.body.password,req.body.firstname, req.body.lastname], function(err,results){
        if(err) return res.sendStatus(400);
        req.session.username = req.body.username;
        res.send(req.body.username);
    });
});

router.get("/conversations/:user", (req, res)=>{
    const user = req.params.user;
    console.log(user);
    const sql = "SELECT DISTINCT u.username FROM `users` u, `messages` m WHERE (m.to = ? OR m.from = ?) AND (m.to = u.username OR m.from = u.username) AND NOT u.username = ?";
    connection.query(sql, [user, user, user], function(err,results){
        if(err) return res.sendStatus(400);
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