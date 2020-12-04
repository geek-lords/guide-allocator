var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const crypto = require('crypto');

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

router.get('/help',function(req, res){
  res.end(`<center>Contact the following if you have any problems:
  Abhiraj Kale : abhirajkale1806@gmail.com
  Sarvesh Joshi : sarveshjoshi25@gmail.com
  Rohan Yadav : yrohan740@gmail.com</center>`);
})

router.get('/:query',(req,res)=>{
  res.redirect('/');
})

router.post('/admin', (req, res)=>{
  const code = (req.body.code);
  res.setHeader('Content-type','text/html');
  if(!code || 0 === code.length || /^\s*$/.test(code))  
  res.end(`<meta http-equiv="content-type" content="text/html; charset=utf-8" /> 
  <center>
  <h2>Code can't be empty.<h2>
  <b><a href="javascript:history.back()">Go Back</a></b>
  </center>`);
  console.log(code)
  if(code=="hW42hdR2dhj73iP21F4h")
  res.end('<h1>Logged In</h1>');
  else
  res.end(`<meta http-equiv="content-type" content="text/html; charset=utf-8" /><center><h1>Incorrect Code</h1><br> <b><a href="javascript:history.back()">Go Back</a></b></center>`)
  
})

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

  if(er_first==null||er_second==null||er_third==null|| er_fourth==null||first==null||second==null||third==null||fourth==null) 
  res.end(`<meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <center>
  <h2>Enrollment IDs can't be empty.<h2>
  <b><a href="javascript:history.back()">Go Back</a></b>
  </center>  `);

  if(er_first==er_second||er_second==er_fourth||er_first==er_fourth) 
  res.end(`
  <center>
  <h2>Enrollment IDs can't be same.<h2>
  <b><a href="javascript:history.back()">Go Back</a></b>
  </center>  `);

  var sql = `SELECT * FROM user_info WHERE mem1=? ||  mem2=? || mem3=? || mem4=?`;
   
  con.query(sql,[er_first,er_second,er_third,er_fourth], (err,result)=>{
    if (err) throw err;
    if(result.length>0){
      if(!result[0].submit){
        return res.redirect(302,'../form/'+result[0].key);    
      }else {
        res.setHeader('Content-type','text/html');
        res.end(`<meta http-equiv="content-type" content="text/html; charset=utf-8" /><center>
        <h2>Entry(s) already exist(s). Please enter UNIQUE Enrollment ID.<h2>
        <b><a href="javascript:history.back()">Go Back</a></b>
        </center>
        `);
      }
      return;
    }else{

      var sql = `INSERT INTO user_info (mem1, mem2, mem3, mem4, avg) VALUES (?, ?, ?, ?, ?)`;
      con.query(sql,[er_first,er_second,er_third,er_fourth,avg],function (err) {
        if (err) throw err;
        console.log("1 record inserted");
      }); 
      
      var sql = `SELECT id FROM user_info WHERE mem1=? AND  mem2=? AND mem3=? AND mem4=? AND avg=?`;
      
      con.query(sql,[er_first,er_second,er_third,er_fourth,avg], (err,result)=>{
        if (err) throw err;
  
        console.log(result);
        const id = result[0].id;
        const key = crypto.randomBytes(32).toString('hex')
        console.log("encrypted: " + key);
        con.query(`UPDATE user_info SET \`key\` = ? WHERE \`id\` = ?`,[key,id],(err)=>{
          if (err) throw err;
  
          res.redirect('./form/'+encodeURIComponent(key));
        })
      })
    }
  })
})
module.exports = router;
