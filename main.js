var mongo = require('mongodb').MongoClient ;
var express = require('express') ;
var app = express() ;
var bodyParser = require('body-parser') ;
var express_session = require('express-session') ;
var compression = require('compression')

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next() ;
}

// 各种中间件
app.use(allowCrossDomain) ;
app.use(bodyParser.json('2mb')) ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(express_session({ secret: 'keyboard cat', resave:false, saveUninitialized: false }))
app.use(compression({threshold: 300 * 1024})) ;
app.use(express.static('static')) ;


var server = app.listen(3001 , function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port) ;

}) ;
