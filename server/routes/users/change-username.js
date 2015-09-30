'use strict';

var passport = require('passport');
var User = mongoose.model('User');

router.put('/users/change-name/:user', function(req, res, next){
    req.body.username = req.body.oldUsername;

    if(!req.body.username || !req.body.password) {
        return res.json({
            message: "Please fill out all fields"
        });
    }

    passport.authenticate('local', function(err, user, info){
        if(err){ return next(err); }

        if(user){
            var obj = req.body;
            var id = req.body._id;
            obj.username = obj.newUsername;

            User.update({_id: id}, obj, {upsert: true}, function(err, user){
                if(err){ return next(err); }

                res.json(obj.username);
            });
        } else {
            return res.status(400).json(info);
        }
    })(req, res, next);

});