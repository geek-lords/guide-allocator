function connect(){
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "bf3fd87e41d689",
  password: "a00a933d"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Database!");
});

exports.con = con;
}

module.exports = {connect};