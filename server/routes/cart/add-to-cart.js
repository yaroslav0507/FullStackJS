'use strict';

var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var CartItem = mongoose.model('CartItem');

router.post('/add-to-cart/', function(req, res, next){

    var item = {
        id:         req.body._id,
        name:       req.body.title,
        image:      req.body.imageURL,
        price:      req.body.price,
        qty:        1
    };


    req.session.cookie.items.push(item);

    //if(req.session.cookie.sessionID){
    //    console.log(req.session.cookie);
    //} else {
    //    req.session.cookie.sessionID = req.session.id;
    //    console.log(req.session.cookie);
    //}

    console.log(req.session);


});