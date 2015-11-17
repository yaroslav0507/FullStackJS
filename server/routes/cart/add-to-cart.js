'use strict';

var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Item = mongoose.model('Items');
var CartItem = mongoose.model('CartItem');

router.post('/add-to-cart/', function (req, res, next) {

    //Retrieving item id and qty for secure reasons
    var item = req.body;
    var cartID = req.cookies['user.id'] || req.cookies['connect.sid'];

    //Search for item in store items by ID
    Item.findById(item.id, function (err, result) {
        if (err) {
            return next(err)
        }
        return result;
    }).then(function (result) {

        checkForExistingCart(cartID, function (response) {
            var cart;

            if(response){
                console.log("\nCart found. Start working with existing cart. \n");

                //Using existing cart
                cart = response;
            } else {
                console.log("\nCart not found. Creating a new cart \n");

                //Creating a new instance of shopping cart
                cart = new Cart({
                    _id: cartID
                });
            }

            var cartItem = new CartItem({
                _id:            result.id,
                images:         result.images,
                title:          result.title,
                price:          result.price,
                mainImageIndex: result.mainImageIndex,
                qty:            item.qty
            });

            console.log('New cart item: ', cartItem);

            cart.addItem(cartItem, function(err, cart){
                if (err) {
                    return next(err)
                }
                console.log(cart);
                res.json(cart);
            });

        });
    });
});

function checkForExistingCart(cartID, cb) {
    /*
    * This function search for existing cart
    * by session id. If cart is found, it returns
    * cart object. Otherwise it throws error
    * */
    Cart.findById(cartID, function (err, cart) {
        if (err) { return next(err) }

        return cart;
    }).then(cb);
}