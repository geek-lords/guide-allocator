var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db_config = {
    host: "us-cdbr-east-02.cleardb.com",
    user: "bf3fd87e41d689",
    password: "a00a933d",
    database: 'heroku_30a612b411cf238',
  };

const con = mysql.createConnection(db_config);

router.get('/:id', (req,res)=>{
    const id = req.params.id;
    var sql = `SELECT * FROM user_info WHERE id=?`;
   
    con.query(sql,[id], (err,result)=>{
      if (err){ res.send('<h1>Something went wrong. Try again.</h1>'); throw err;}
      res.end(`
        <h3>Your Group ID: ${id}</h3>
        <p>Member 1 : ${result[0].mem1}</p>
        <p>Member 2 : ${result[0].mem2}</p>
        <p>Member 3 : ${result[0].mem3}</p>
        <p>Member 4 : ${result[0].mem4}</p>
        <p><i>Group Average: <b>${result[0].Avg}</b></i></p>
      `)
    })
})

module.exports = router;