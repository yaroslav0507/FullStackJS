'use strict';

var Order = mongoose.model('Order');

router.get('/get-orders/', function (req, res, next) {

    Order.find({}, function(err, orders){
        if (err){ return err }

        res.json(orders);
    })

});

