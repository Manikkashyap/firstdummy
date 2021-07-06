var express = require('express');
var app = express();


     sql = require("mssql");

    // config for your database
    var config = {
        user: 'manik',
        password: '1234',
        server: 'localhost',
        database: 'demo1'
    };


    app.get('/',function(req,res){

      let connection = sql.connect(config,(err)=>{

        if(err){
          console.log(err);
        }
        else{
          res.send('DB Connected')
        }

      })

    })




var server = app.listen(5000, function () {
    console.log('Server is running at localhost : 5000');
});
