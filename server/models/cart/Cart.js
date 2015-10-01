var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
    _id: String,
    total: Number,
    items: []
});

CartSchema.methods.addItem = function(item, cb){
    this.items.push(item);
    this.save(cb);
};

mongoose.model('Cart', CartSchema);