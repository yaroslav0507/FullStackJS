'use strict';

var fs = require('fs');
var Item = mongoose.model('Items');
require('dotenv').load();

router.get('/items', function(req, res, next){
    Item.find(function(err, items){
        if(err){ return next(err); }
        res.json(items);
    });
});

router.get('/category-items/:category', function(req, res, next){
    Item.find({category: req.params.category}, function(err, items){
        if(err){ return next(err); }
        res.json(items);
    });
});

/* Add item */
router.post('/items', function(req, res, next){
    var item = new Item();

    item.title = req.body.title;
    item.description = req.body.description;
    item.price = req.body.price;
    item.images = req.body.images;
    item.category = req.body.category;

    item.save(function(err, item){
        if(err){ return next(err) }
        res.json(item);
    });

});

/* Update item */
router.put('/items/', function(req, res, next){

    var obj = req.body;
    var id = req.body._id;

    Item.update({_id: id}, obj, {upsert: true}, function(err, item){
        if(err){ return next(err); }
        res.json(item);
    });

});

/* Preloading item objects */
router.param('item', function(req, res, next, id){
    var query = Item.findById(id);

    query.exec(function(err, item){
        if (err){ return next(err); }
        if (!item){ return next(new Error('can\'t find item')); }

        req.item = item;
        return next();
    });
});

/* Find item by id */
router.get('/items/:item', function(req, res){
    res.json(req.item);
});

/* Remove item */
router.delete('/items/:item', function(req, res){
    Item.find(function(err, items, item){
        if(err){ return next(err); }

        var dimentions = [160, 256].concat("origin");

        var images = req.item.images;
        console.log(dimentions);

        dimentions.forEach(function(dimention){
            images.forEach(function(filename){
                var filePath = './server/static/images/items/' + dimention + '/' + filename ;

                /*Check if path exists*/
                var pathExists = fs.existsSync(filePath);
                if(pathExists){
                    /*Delete file fom the file system*/
                    fs.unlinkSync(filePath);
                }

            });
        });

        req.item.remove(function(err, next){
            if(err){ return next(err); }
        });
        res.json(items);
    });
});


