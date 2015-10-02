'use strict';

var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Item = mongoose.model('Items');
var CartItem = mongoose.model('CartItem');

router.post('/add-to-cart/', function(req, res, next){
    var item = req.body;

    console.log(req.cookies);
    res.send();
    //
    //
    //
    //Item.findById(item.id, function (err, result) {
    //    if (err) { return next(err) }
    //
    //    return result;
    //
    //}).then(function(result){
    //    var cart = new Cart();
    //
    //    cart.total = 100;
    //    console.log(cart);
    //
    //
    //    cart.save(function(err, cart){
    //        if(err){ return next(err) }
    //        res.json(cart);
    //    });
    //});
});