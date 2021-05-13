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
    if(!req.body.username ||  !req.body.password || !req.body.email) return res.sendStatus(400);
    const sql = "INSERT INTO `users` (`username`, `password`, `email`) VALUES(?,?,?)";
    connection.query(sql, [req.body.username, req.body.password, req.body.email], function(err,results){
        if(err) return res.sendStatus(400);
        req.session.username = req.body.username;
        return res.send(req.body.username);
    });
});

router.get("/conversations/:user", (req, res)=>{
    const user = req.params.user;
    const sql = "SELECT m.content, latest.username FROM messages m JOIN (SELECT MAX(`timestamp`) AS `timestamp`, CASE WHEN m.from = ? THEN m.to ELSE m.from END AS `username` from messages m GROUP BY `username`) latest on m.timestamp=latest.timestamp GROUP BY `username`";   
    connection.query(sql, [user], function(err,results){
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
