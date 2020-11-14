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

router.get('/:key', (req,response)=>{
    const key = decodeURIComponent(req.params.key);
  
    var sql = "SELECT * FROM user_info WHERE `key`=?";
    con.query(sql,[key], (err,result)=>{
      if (err) throw err;

    if(result[0].submit) response.end(`<center>
    <h2>Response has already been recorded.<h2>
    <b><a href="javascript:history.back()">Go Back</a></b>
    </center>
    `);

    var query = `SELECT id,name FROM guide_info`;
    con.query(query, (err, res)=>{
      if (err) throw err;
      
      response.render('form',{
        group_id: result[0].id,
        mem1:result[0].mem1,
        mem2:result[0].mem2,
        mem3:result[0].mem3,
        mem4:result[0].mem4,
        average:result[0].Avg,
        guide: res
    });

    })
    })  
    
})

module.exports = router;