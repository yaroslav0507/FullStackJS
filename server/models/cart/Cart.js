var mongoose = require('mongoose');
var CartItemSchema = require('./CartItem');

var CartSchema = new mongoose.Schema({
    total: Number,
    items: [CartItemSchema]
});

CartSchema.methods.addItem = function(item, cb){
    this.items.push(item);
    this.save(cb);
};

mongoose.model('Cart', CartSchema);