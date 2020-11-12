var express = require('express');
var router = express.Router();
const connect = require('./connect');
connect.connect(); // Connect to DB
const con = connect.con; 

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
  const first = req.body.first;
  const second = req.body.second;
  const third = req.body.third; 
  const fourth = req.body.fourth; 
  const avg = (first+second+third+fourth)/400;
  console.log(first + "  "+ second)
  var sql = `INSERT INTO user_info (mem1, mem2, mem3, mem4, avg) VALUES (${er_first}, ${er_second}, ${er_third}, ${er_fourth}, ${avg})`;
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.end(first+second+third+fourth);
})

module.exports = router;
