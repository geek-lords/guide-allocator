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

router.get('/',(req,res)=>{
  res.redirect('../');
})

router.get('/:key', (req,response)=>{
    const key = decodeURIComponent(req.params.key);

    if(!key || 0 === key.length || /^\s*$/.test(key))  
    res.end(`
    <center>
    <h2>Key can't be empty.<h2>
    <b><a href="javascript:history.back()">Go Back</a></b>
    </center>`);

    var sql = "SELECT * FROM user_info WHERE `key`=?";
    con.query(sql,[key], (err,result)=>{
      if (err) throw err;
    
    if(result.length==0) response.end(`<center><h1>No such entry</h1><b><a href="javascript:history.back()">Go Back</a></b>
    </center>`)  

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

router.get('/submit/calc', (req,res)=>{
  /*
  try {
    con.query(`SELECT * FROM user_info ORDER BY Avg DESC`, function(err,user_result){
      if(err) throw err;
  
    con.query(`SELECT * FROM guide_info`, function(err, guide_result){
      if(err) throw err;
    
    for(var i=0; i<user_result.length; i++){
      var regex = /[\[\]\s]/g;
      var list = ((user_result[i].Preferences).replace(regex, '')).split`,`.map(x=>+x);
      for(var j=0; j<list.length; j++){   
        if(guide_result[list[j]-1].assigned < 2){
          console.log("List of j : " + list[j])
          con.query("UPDATE user_info SET `Assigned`=? WHERE id=?",[list[j],user_result[i].id],(err)=>{
            if (err) throw err;
          });
            var assigned = ++guide_result[list[j]-1].assigned;
            con.query("UPDATE guide_info SET `assigned`=? WHERE id=?",[assigned,guide_result[list[j]-1].id],(error)=>{
                if(err) throw error;
            });
          console.log(guide_result[list[j]-1]) 
          break;
        }
      }
    }
    });
  });
  
  } catch (error) {
    res.status(404).send(error);
  }
*/
  res.status(200).send('Success');
})

function calc(){
  
}
module.exports = router;