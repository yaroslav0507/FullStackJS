'use strict';

var multer = require('multer');
var fs = require('fs');
var gm = require('gm').subClass({imageMagic: true});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/static/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/').slice(1));
    }
});

var upload = multer({
    storage: storage
});

router.post('/upload', upload.single('file'), function(req, res, next){

    //gm('./server/static/images/' + req.file.filename)
    //    .resize(265)
    //    .noProfile()
    //    .write('./server/static/images/265/' + req.file.filename, function(err){
    //        if (err){
    //            console.log(err);
    //        }
    //    });
    //console.log('trace');
    res.status(200).send(req.file.filename);
});