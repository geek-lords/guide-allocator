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

router.get('/:id', (req,response)=>{
  
    const id = atob(req.params.id);
    var sql = `SELECT * FROM user_info WHERE id=?`;
   
    con.query(sql,[id], (err,result)=>{
      if (err) return log("Query failed. Error: %s. Query: %s", err, query);
    var query = `SELECT id,name FROM guide_info`;
    con.query(query, (err, res)=>{
      if (err) return log("Query failed. Error: %s. Query: %s", err, query);
      
      response.render('form',{
        group_id: id,
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