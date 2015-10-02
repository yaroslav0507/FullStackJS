'use strict';

var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Item = mongoose.model('Items');
var CartItem = mongoose.model('CartItem');

router.post('/add-to-cart/', function (req, res, next) {
    console.log(req.cookies['connect.sid']);

    //Retrieving item id and qty
    var item = req.body;

    //Search for item in store items by ID
    Item.findById(item.id, function (err, result) {
        if (err) {
            return next(err)
        }
        return result;
    }).then(function (result) {

        //Creating a new instance of shopping cart
        var cart = new Cart({
            _id: req.cookies['connect.sid']
        });

        var cartItem = new CartItem({
            _id:    result.id,
            price:  result.price,
            qty:    item.qty
        });

        cart.addItem(cartItem);

        cart.save(function (err, cart) {
            if (err) {
                return next(err)
            }
            res.json(cart);
        });
    });
});