"use strict";

var multer = require("multer");
var fs = require("fs");
require("imagemagick");
var gm = require("gm").subClass({ imageMagick: true });
var path = require("path");

var imagePath = "./server/static/images/";

var itemPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(imagePath, "items/origin"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/").slice(1));
    }
});


var userPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(imagePath, "users/origin"));
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        cb(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/").slice(1));
    }
});

var uploadItemPic = multer({
    storage: itemPicStorage
});

var uploadUserPic = multer({
    storage: userPicStorage
});

function generateSizes(config, cb){
    var buffer = fs.readFileSync(imagePath + config.directory + "/origin/" + config.filename);

    var urls = {};

    config.sizes.forEach(function(size){
        gm(buffer)
            .resize(null, size)
            .write(imagePath + config.directory + "/" + size + "/" + config.filename, function (err) {
                if (err) console.log(err);
            });

        urls[size] = '/images/'+ config.directory + '/' + size + '/' + config.filename;
    });

    cb(urls);
}

router.post("/upload/", uploadItemPic.single("file"), function(req, res, next){

    var config = {
        sizes: [160, 256],
        directory: 'items',
        filename: req.file.filename
    };

    generateSizes(config, function(urls){
        res.status(200).json(urls);
    });

});

router.post("/upload/user-pic/", uploadUserPic.single("file"), function(req, res, next){
    var sizes = [32, 48];
    var urls = generateSizes(sizes, 'users', req.file.filename);
    res.status(200).json(urls);
});