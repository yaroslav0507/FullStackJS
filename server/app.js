var express         = require('express');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var mongoose        = require('mongoose');
var path            = require('path');
var methodOverride  = require('method-override');
var passport        = require('passport');
var session         = require('express-session');
var app             = express();

require('dotenv').load();
require('./models/Items');
require('./models/Users');
require('./models/Categories');
require('./models/cart/Cart');
require('./models/cart/CartItem');

require('./models/orders/Order');

require('./config/passport-local');
require('./config/passport-facebook');

var routes = require('./routes/index');

mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_CONNECTION );

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET");
    next();
});

app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if(app.settings.env === 'development'){
    app.use(express.static(path.join(__dirname, "../dist")));
} else {
    app.use(express.static(path.join(__dirname, "../release")));
}

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static(path.join(__dirname, "./img")));
app.use(passport.initialize());


app.use('/', session({
    secret: process.env.JWT_CERT,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24, // One day expiration for cookies
        httpOnly: true
    }
}));

app.use('/', routes);

app.use(function(err, req, res, next){
    res.status(500).send({err: err.stack});
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


var port = normalizePort(process.env.PORT || process.env.SERVER_PORT);

app.listen(port, function(){
    console.log('Express server listening on port: ' + port);
});

module.exports = app;



