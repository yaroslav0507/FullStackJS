"use strict";

var multer = require("multer");
var fs = require("fs");
var gm = require("gm").subClass({ imageMagick: true });
var path = require("path");


var imagePath = "./server/static/images/";
var upload = multer({ dest: imagePath });

/**
 * Creating directory for specific image size if not exists
 * requires npm "fs" module.
 */
function createDirIfNotExists(path){
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}


/**
 * Specifying storages for different image types
 */
var itemPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        createDirIfNotExists(imagePath + "items/origin");
        cb(null, path.join(imagePath, "items/origin"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.split('.')[0] + "." + file.mimetype.split("/").slice(1));
    }
});

var userPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        createDirIfNotExists(imagePath + "users/origin");
        cb(null, path.join(imagePath, "users/origin"));
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        cb(null, Date.now() + "-" + file.originalname.split('.')[0] + "." + file.mimetype.split("/").slice(1));
    }
});

var uploadItemPic = function(filename){
    return multer({
        storage: itemPicStorage
    }).array(filename);
};

var uploadUserPic = function(filename){
    return multer({
        storage: userPicStorage
    }).array(filename);
};

function generateSizes(config, cb){
    var filenames = [];

    config.files.forEach(function(file){
        /**
         * Writing original file to buffer.
         * Now we have an ability to work with it
         * and create multiple image instances with different sizes
         */
        var buffer = fs.readFileSync(imagePath + config.directory + "/origin/" + file.filename);

        config.sizes.forEach(function(size){

            createDirIfNotExists(imagePath + config.directory + '/' + size);

            gm(buffer)
                .resize(null, size)
                .write(imagePath + config.directory + "/" + size + "/" + file.filename, function (err) {
                    if (err) console.log(err);
                });
        });

        filenames.push(file.filename);
    });



    cb(filenames);
}

router.post("/upload/", uploadItemPic("file"), function(req, res, next){
    console.log("Files array: ", req.files);

    var config = {
        sizes: [160, 256],
        directory: 'items',
        files: req.files
    };

    generateSizes(config, function(filenames){
        res.json(filenames);
    });

});

router.post("/upload/user-pic/", uploadUserPic("file"), function(req, res, next){

    var config = {
        sizes: [32, 48],
        directory: 'users',
        files: req.files
    };

    generateSizes(config, function(filenames){
        res.json(filenames);
    });
});