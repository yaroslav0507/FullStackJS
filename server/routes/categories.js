'use strict';

var Category = mongoose.model('Categories');

router.get('/categories', function(req, res, next){
    Category.find(function(err, categories){
        if(err){ return next(err); }
        res.json(categories);
    });
});

router.post('/categories', function(req, res, next){

    var category = new Category({
        name: req.body.name
    });

    category.save(function(err, category){
        if(err){ return next(err) }
        res.json(category);
    });
});

/* Preloading category objects */
router.param('category-id', function(req, res, next, id){
    var query = Category.findById(id);

    query.exec(function(err, cat){
        if (err){ return next(err); }
        if (!cat){ return next(new Error('can\'t find category')); }

        req.category = cat;
        return next();
    });
});

/* Remove category */
router.delete('/categories/:category-id', function(req, res){
    Category.find(function(err, categories, category){
        if(err){ return next(err); }

        req.category.remove(function(err, next){
            if(err){ return next(err); }
        });

        console.log(categories);
        res.json(categories);
    });
});


