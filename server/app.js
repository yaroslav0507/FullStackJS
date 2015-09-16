var express         = require('express');
var bodyParser      = require('body-parser');
var logger          = require('morgan');
var mongoose        = require('mongoose');
var path            = require('path');
var methodOverride  = require('method-override');
var passport        = require('passport');
var app             = express();
var multer = require('multer');

require('dotenv').load();
require('./models/Items');
require('./models/Users');

require('./config/passport');

var routes = require('./routes/index');

mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds041583.mongolab.com:41583/pet');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET");
    next();
});

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "./static")));
app.use(passport.initialize());

app.use('/', routes);

app.get('/api', function(req, res){
    res.send('API is running');
});

app.use(function(err, req, res, next){
    res.status(500).send({err: err.stack});
});

app.listen(process.env.SERVER_PORT, function(){
    console.log('Express server listening on port: ' + process.env.SERVER_PORT);
});

module.exports = app;

// mongodump -h ds041583.mongolab.com:41583 -d pet -u administrator -p styleworks -o D:\dump &#45;&#45;oplog
// mongorestore -h ds041583.mongolab.com:41583 -d pet -u administrator -p styleworks D:\dump\pet\ &#45;&#45;oplogReplay


