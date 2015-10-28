'use strict';
var Cart = mongoose.model('Cart');

router.get('/get-cart/', function (req, res, next) {

    var cartID = req.cookies['connect.sid'];

    Cart.findById(cartID, function (err, cart) {
        if (err) { return next(err) }
        res.json(cart);
    });

    //Cart.findById(cartID)
    //    .populate('items')
    //    .exec(function(err, item){
    //
    //    })

});