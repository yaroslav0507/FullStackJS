'use strict';

var passport = require('passport');
var User = mongoose.model('User');

router.put('/users/change-pass/:user', function(req, res, next){

    req.body.password = req.body.oldPassword;

    passport.authenticate('local', function(err, user, info){
        if(err){ return next(err); }

        if(user){
            var id = req.body._id;
            console.log('auth successfull');

            if(req.body.newPassword === req.body.repeatPassword){

                user.setPassword(req.body.newPassword);

                User.update({_id: id}, user, {upsert: true}, function(err, user){
                    if(err){ return next(err); }

                    console.log('Password changed');

                    res.json({"message": "Your password was successfully changed"});
                });
            } else {
                res.json({"message": "Entered passwords are not equal"});
            }

        } else {
            return res.status(400).json(info);
        }
    })(req, res, next);

});