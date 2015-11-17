'use strict';

var Cart = mongoose.model('Cart');

router.delete('/delete-from-cart/:id', function (req, res, next) {

    //Retrieving item id and qty for secure reasons
    var itemID = req.params.id;

    var cartID = req.cookies['user.id'] || req.cookies['connect.sid'];

    //Search for item in store items by ID
    checkForExistingCart(cartID, function (response) {
        var cart;

        if(response){
            console.log("\nCart found. Start working with existing cart. \n");

            //Using existing cart
            cart = response;
        } else {
            console.log("\nCart not found. Nothing to delete \n");
            return;
        }

        cart.removeItem(itemID, function(err, cart){
            if (err) {
                return next(err)
                res.json(err);
            }
            console.log(cart);
            res.json(cart);
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