'use strict';
var Cart = mongoose.model('Cart');
var CartItem = mongoose.model('CartItem');

router.put('/update-cart/', function (req, res, next) {

    var cartID = req.cookies['user.id'] || req.cookies['connect.sid'];
    console.log("Body: ", req.body, '\n');

    function findById(source, id) {
        for (var i = 0; i < source.length; i++) {
            if (source[i].id === id) {
                return source[i];
            }
        }
        throw "Couldn't find object with id: " + id;
    }

    Cart.findById(cartID)
        .populate('items')
        .exec(function (err, cart) {
            if (err) { return next(err) }

            req.body.items.forEach(function (item){
                var cartItem = findById(cart.items, item._id);
                cartItem.qty = item.qty;
            });


            cart.total = 0;
            cart.itemsCount = 0;
            
            cart.items.forEach(function(item){
                item.total = item.price * item.qty;
                cart.total += item.total;
                cart.itemsCount += item.qty;
            });


            Cart.update({_id: cartID}, cart, {upsert: true}, function(err, response){
                if(err){ return next(err); }

                    console.log("Updated cart: ", cart);
                    res.status(200).json(cart);
            });

        });

});