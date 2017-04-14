var mongo = require('mongodb').MongoClient ;
var express = require('express') ;
var app = express() ;
var bodyParser = require('body-parser') ;
var express_session = require('express-session') ;
var compression = require('compression')

var MONGO_URL = 'mongodb://localhost:27017/ear-travel';

var g_db = null ;
var g_sounds = null ;

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

app.post('/api/sounds_all', function(req, resp) {
	g_sounds.find({}).toArray().then(function(doc) {
		resp.send(doc) ;
	})
})

app.post('/api/sound_add', function(req, resp) {
	var sound = req.body ;
	g_sounds.insertOne(sound).then(function(result) {
		resp.send({code : 0}) ;
	}) ;
})

app.post('/api/sound_del', function(req, resp) {
	var id = req.body.id ;
	g_sounds.deleteOne({_id : id}).then(function(result) {
		resp.send({code : 0}) ;
	})
})

function all_sounds(sounds) {
	//console.log(sounds.find({})) ;
	return sounds.find({}).toArray() ;
}

function del_sound(id) {
	sounds.deleteOne({_id : id}) ;
}

function modify_sound(id, obj) {
	sounds.updateOne({_id : id}, {$set : obj}) ;
}

function add_sound(sound) {
	return sounds.insertOne(sound) ;
}

// mongo.connect(MONGO_URL, function(err, db) {
// 	console.log(db.collection('sounds').find({})) ;
// 	console.log(err) ;
// })





// mongo.connect(MONGO_URL).
// 	then(function(db) {
// 		g_db = db ;
// 		g_sounds = db.collection('sounds') ;
// 	}).
// 	then(function() {
// 		//console.log(g_sounds) ;
// 		//return g_sounds.insertOne({name : "sound_add"}) ;
// 		//return g_sounds.deleteOne({name : 'sound_add'}) ;
// 		return g_sounds.updateOne({name : 'sound_add'}, {$set : {name : "new_add", extra : 'extra'}}) ;
// 	}).
// 	then(function() {
// 		return all_sounds(g_db.collection('sounds')) ;
// 	}).
// 	then(function(docs) {
// 		console.log(docs) ;
// 		g_db.close() ;
// 	}).
// 	catch(function(err) {
// 		console.log('error: \n' + err) ;
// 	}) ;



var server = app.listen(3000 , function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port) ;

  mongo.connect(MONGO_URL).then(function(db) {
  	g_db = db ;
  	g_sounds = db.collection('sounds') ;
  	console.log('connected to mongodb') ;
  })
}) ;