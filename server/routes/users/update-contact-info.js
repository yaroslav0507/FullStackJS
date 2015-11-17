'use strict';

var User = mongoose.model('User');

router.put('/users/update-info/', function(req, res, next){

    var obj = req.body;
    var id = req.body._id;

    //User.findById(id, function(err, user){
    //    if(err){ return next(err); }
    //
    //    console.log(user);
    //    res.json(user);
    //});

    User.update({_id: id}, obj, {upsert: true}, function(err, user){
        if(err){ return next(err); }

        res.json(user);
    });

});