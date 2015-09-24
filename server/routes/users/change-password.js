'use strict';

var passport = require('passport');
var User = mongoose.model('User');

router.put('/users/change-pass/:user', function(req, res, next){

    passport.authenticate('local', function(err, user, info){
        if(err){ return next(err); }

        if(user){
            console.log('auth successfull');
            //TODO change password
        } else {
            return res.status(400).json(info);
        }
    })(req, res, next);

});