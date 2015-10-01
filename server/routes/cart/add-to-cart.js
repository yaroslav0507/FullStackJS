'use strict';

var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Item = mongoose.model('Items');
var CartItem = mongoose.model('CartItem');

router.post('/add-to-cart/', function(req, res, next){

    var item = {
        id:         req.body._id,
        qty:        1
    };
    var storeItem = Item.findById(item.id, function (err, result) {
        if (err) { return next(err) }
        console.log(result);
        //return result;
    });

    res.send(storeItem);

});