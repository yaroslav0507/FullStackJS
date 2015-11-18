'use strict';

var Order = mongoose.model('Order');

router.get('/get-user-orders/', function (req, res, next) {

    var orderID = req.cookies['user.id'] || req.cookies['connect.sid'];

    Order.find({'cart._id': orderID}, function(err, orders){
        if (err){ return err }

        res.json(orders);
    });

});

