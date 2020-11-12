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
  res.end(first+second+third+fourth);
})

module.exports = router;
