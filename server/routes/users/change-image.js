'use strict';

var User = mongoose.model('User');

router.put('/users/change-image/:user', function(req, res, next){

    var obj = req.body;
    var id = req.body._id;

    User.update({_id: id}, obj, {upsert: true}, function(err, user){
        if(err){ return next(err); }

        res.json(req.user.imageURL);
    });

});