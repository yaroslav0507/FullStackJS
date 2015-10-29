'use strict';

var Order = mongoose.model('Order');

router.post('/checkout/', function (req, res, next) {

    var order = new Order({
        cart: req.body.cart,
        customer: req.body.customer
    });

    order.save(function(err, order){
        if(err){ return next(err) }
        res.json(order);
    });

});

