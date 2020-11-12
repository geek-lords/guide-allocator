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
  console.log(first + " " + second + " " + third + " " + fourth);
  console.log(first+second+third+fourth);
  console.log(avg);
    var sql = `INSERT INTO user_info (mem1, mem2, mem3, mem4, avg) VALUES (?, ?, ?, ?, ?)`;
    console.log(sql);
    con.query(sql,[er_first,er_second,er_third,er_fourth,avg],function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    }); 

  res.end("<h1>Your average is "+avg+" </h1>");
})

module.exports = router;
