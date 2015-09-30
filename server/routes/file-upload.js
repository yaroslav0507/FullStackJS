'use strict';

var multer = require('multer');
var fs = require('fs');
var gm = require('gm').subClass({imageMagic: true});

var itemPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/static/images/items/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/').slice(1));
    }
});


var userPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/static/images/users/')
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/').slice(1));
    }
});

var uploadItemPic = multer({
    storage: itemPicStorage
});

var uploadUserPic = multer({
    storage: userPicStorage
});

router.post('/upload', uploadItemPic.single('file'), function(req, res, next){
    //gm('./server/static/images/' + req.file.filename)
    //    .resize(265)
    //    .noProfile()
    //    .write('./server/static/images/265/' + req.file.filename, function(err){
    //        if (err){
    //            console.log(err);
    //        }
    //    });
    //console.log('trace');

    var filename;
    filename = (req.file) ? req.file.filename : '';

    res.status(200).send(filename);
});

router.post('/upload/user-pic/', uploadUserPic.single('file'), function(req, res, next){
    var filename;
    filename = (req.file) ? req.file.filename : '';

    res.status(200).send(filename);
});