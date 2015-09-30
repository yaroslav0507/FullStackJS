'use strict';

var Item = mongoose.model('Items');

router.get('/items', function(req, res, next){
    Item.find(function(err, items){
        if(err){ return next(err); }
        res.json(items);
    });
});

/* Add item */
router.post('/items', function(req, res, next){
    var item = new Item(req.body);

    item.title = req.body.title;
    item.description = req.body.description;
    item.price = req.body.price;
    item.imageURL = req.body.imageURL;

    item.save(function(err, item){
        if(err){ return next(err) }
        res.json(item);
    });
});

/* Update item */
router.put('/items/:item', function(req, res, next){

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
        req.item.remove(function(err, next){
            if(err){ return next(err); }
        });
        res.json(items);
    });
});

require('./cart/add-to-cart');