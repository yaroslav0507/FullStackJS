'use strict';

var User = mongoose.model('User');
var Cart = mongoose.model('Cart');

router.post('/add-to-cart/', function(req, res){
    res.send('Added');
});