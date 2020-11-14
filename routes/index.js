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

  var sql = `SELECT id FROM user_info WHERE mem1=? ||  mem2=? || mem3=? || mem4=?`;
   
  con.query(sql,[er_first,er_second,er_third,er_fourth], (err,result)=>{
    if (err){ console.log(err); res.end('<h1>Something went wrong. Try again.</h1>'); }
    if(result.length>0) res.end(`<center>
    <h2>Entry(s) already exist(s). Please enter UNIQUE Enrollment ID.<h2>
    <b><a href="javascript:history.back()">Go Back</a></b>
    </center>
    `);
  })

    var sql = `INSERT INTO user_info (mem1, mem2, mem3, mem4, avg) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql,[er_first,er_second,er_third,er_fourth,avg],function (err, result) {
      if (err){ console.log(err); res.end('<h1>Something went wrong. Try again.</h1>'); }
      console.log("1 record inserted");
    }); 
    //res.send(`<center><h1>Your response has been recorded.</h1>
      //                <p>Please wait till you are being redirected...</p></center>`)
    var sql = `SELECT id FROM user_info WHERE mem1=? AND  mem2=? AND mem3=? AND mem4=? AND avg=?`;
   
    con.query(sql,[er_first,er_second,er_third,er_fourth,avg], (err,result)=>{
      if (err){ conosle.log(err); res.end('<h1>Something went wrong. Try again.</h1>'); }

      const encrypted = sha256(result[0].id);
      const id = encodeURIComponent(encrypted)
      console.log("encrypted: " + id);
      res.redirect('./form/'+encodeURIComponent(id));
    })
})

module.exports = router;
