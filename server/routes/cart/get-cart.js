'use strict';
var Cart = mongoose.model('Cart');

router.get('/get-cart/', function (req, res, next) {

    var cartID = req.cookies['connect.sid'];

    Cart.findById(cartID)
        .populate('items.item')
        .exec(function(err, cart) {
            if(err) {return res.sendStatus(500);}
            res.json(cart);
        });


});