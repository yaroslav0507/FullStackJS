'use strict';

var Order = mongoose.model('Order');

/* Preloading order objects */
router.param('order', function(req, res, next, id){
    var query = Order.findById(id);

    query.exec(function(err, order){
        if (err){ return next(err); }
        if (!order){ return next(new Error('can\'t find order')); }

        req.order = order;
        return next();
    });
});

router.delete('/order/:order', function(req, res){
    Order.find(function(err, orders, order){
        if(err){ return next(err); }

        req.order.remove(function(err, next){
            if(err){ return next(err); }
        });

        console.log(orders);
        res.json(orders);
    });
});