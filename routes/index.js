var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const sha256 = require('sha256');

var db_config = {
    host: "us-cdbr-east-02.cleardb.com",
    user: "bf3fd87e41d689",
    password: "a00a933d",
    database: 'heroku_30a612b411cf238',
  };

const con = mysql.createConnection(db_config);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Home');
});

router.get('/validate', function(req,res){
  res.end('<h1>Invalid Request</h1>'); 
})

router.post('/validate', (req, res) =>{
  const er_first = req.body.er_first;
  const er_second = req.body.er_second;
  const er_third = req.body.er_third; 
  const er_fourth = req.body.er_fourth;
  const first = parseInt(req.body.first);
  const second = parseInt(req.body.second);
  const third = parseInt(req.body.third); 
  const fourth = parseInt(req.body.fourth); 
  const avg = (first+second+third+fourth)/4;

  if(er_first==er_second||er_second==er_fourth||er_first==er_fourth) 
  res.end(`
  <center>
  <h2>Enrollment IDs can't be same.<h2>
  </center>  `);

  var sql = `SELECT id FROM user_info WHERE mem1=? ||  mem2=? || mem3=? || mem4=?`;
   
  con.query(sql,[er_first,er_second,er_third,er_fourth], (err,result)=>{
    if (err) return log("Query failed. Error: %s. Query: %s", err, query);
    if(result.length>0) res.end(`<center>
    <h2>Entry(s) already exist(s). Please enter UNIQUE Enrollment ID.<h2>
    <b><a href="javascript:history.back()">Go Back</a></b>
    </center>
    `);
  })

    var sql = `INSERT INTO user_info (mem1, mem2, mem3, mem4, avg) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql,[er_first,er_second,er_third,er_fourth,avg],function (err, result) {
      if (err) return log("Query failed. Error: %s. Query: %s", err, query);
      console.log("1 record inserted");
    }); 
    //res.send(`<center><h1>Your response has been recorded.</h1>
      //                <p>Please wait till you are being redirected...</p></center>`)
    var sql = `SELECT id FROM user_info WHERE mem1=? AND  mem2=? AND mem3=? AND mem4=? AND avg=?`;
   
    con.query(sql,[er_first,er_second,er_third,er_fourth,avg], (err,result)=>{
      if (err) return log("Query failed. Error: %s. Query: %s", err, query);

      const id = result[0].id;
      const key = sha256(toString(id));
      console.log("encrypted: " + key);
      con.query("UPDATE user_info SET key='?' WHERE id=?",[key,id],(err)=>{
        if (err) return log("Query failed. Error: %s. Query: %s", err, query);

        res.redirect('./form/'+encodeURIComponent(key));
      })
    })
})

module.exports = router;
