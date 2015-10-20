"use strict";

var multer = require("multer");
var fs = require("fs");
var gm = require("gm").subClass({ imageMagick: true });
var path = require("path");

var imagePath = "./server/static/images/";

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
        cb(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/").slice(1));
    }
});

var userPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        createDirIfNotExists(imagePath + "users/origin");
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
    /**
     * Writing original file to buffer.
     * Now we have an ability to work with it
     * and create multiple image instances with different sizes
     */
    var buffer = fs.readFileSync(imagePath + config.directory + "/origin/" + config.filename);

    config.sizes.forEach(function(size){

        createDirIfNotExists(imagePath + config.directory + '/' + size);

        gm(buffer)
            .resize(null, size)
            .write(imagePath + config.directory + "/" + size + "/" + config.filename, function (err) {
                if (err) console.log(err);
            });
    });
}

router.post("/upload/", multer().array("files"), function(req, res, next){
    console.log("Files array: ", req.files);

    var config = {
        sizes: [160, 256],
        directory: 'items',
        filename: req.files
    };

    generateSizes(config);

    res.send(config.filename);

});

router.post("/upload/user-pic/", uploadUserPic.single("file"), function(req, res, next){

    var config = {
        sizes: [32, 48],
        directory: 'users',
        filename: req.file.filename
    };

    generateSizes(config);

    res.send(config.filename);
});