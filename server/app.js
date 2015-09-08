var express         = require('express');
var bodyParser      = require('body-parser');
var logger          = require('morgan');
var mongoose        = require('mongoose');
var path            = require('path');
var methodOverride  = require('method-override');
var app = express();

app.use(logger('dev'));
app.use(methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, "../dist")));

app.get('/api', function(req, res){
    res.send('API is running');
});

app.listen(4000, function(){
    console.log('port 4000');
});

//mongoose.connect('');