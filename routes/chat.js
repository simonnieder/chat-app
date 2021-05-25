const express = require("express");
const router = express.Router();
const connection = require("../database/connection");

router.get("/:user1/:user2",(req,res)=>{
    const user1 = req.params.user1;
    const user2 = req.params.user2;
    const sql = `SELECT \`from\`, \`to\`, \`content\`, \`timestamp\` 
                    FROM \`messages\` 
                    WHERE (\`from\` = ? AND \`to\` = ?) 
                        OR (\`from\` = ? AND \`to\` = ?) 
                    ORDER BY \`id\``;
    connection.query(sql, [user1, user2, user2, user1], function(err,results){
        if(err || results?.length == 0) return res.status(400).json({error: "No messages found!"})
        res.send(results);
    });
});

module.exports = router;