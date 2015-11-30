'use strict';

var User = mongoose.model('User');

router.get('/users', function(req, res, next){
    User.find(function(err, users){
        if(err){ return next(err); }
        res.json(users);
    });
});

router.get('/users/:user', function(req, res){
    var data = {
        _id: req.user._id,
        username: req.user.username,
        image: req.user.image,
        contact: req.user.contact
    };
    res.send(data);
});

/* Preloading user objects */
router.param('user', function(req, res, next, id){
    var query = User.findById(id);

    query.exec(function(err, user){
        if (err){ return next(err); }
        if (!user){ return next(new Error('can\'t find user')); }

        req.user = user;
        return next();
    });
});
