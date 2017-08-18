/**
 * Created by seshasai on 21/07/2017.
 */

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var connectionString='mongodb://localhost/skycast';
var awsConnectionString = 'skycast:skycast@localhost:27017/skycast'
var request = require('request');

var db = mongoose.connect(connectionString);
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use(session({secret:"skycast",
    resave:true,
    saveUninitialized: true   }));
app.use(cookieParser());
var ipaddress = '127.0.0.1';
var port = 3000;
app.get('/hello',function(req,res){
    res.send("hello world");
});
app.get('/getlocalweather/:pos',function(req,res){
    var pos = req.params["pos"];
    request('https://api.darksky.net/forecast/37215ce782aeb1ec8b367e3aa006d5c1/'+pos,function(error,response,body){;
        return res.send(body);
    });
});
app.get('/getpastweatherdetails/:params',function(req,res){
    var params = req.params["params"];
    request('https://api.darksky.net/forecast/37215ce782aeb1ec8b367e3aa006d5c1/'+params,function(error,response,body){
        return res.send(body);
    });
});
console.log("app listining");
app.listen(port);

require('./public.server/app/app.js')(app,db);