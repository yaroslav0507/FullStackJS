var mongoose = require('mongoose');
var CartItemSchema = require('./CartItem');

var CartSchema = new mongoose.Schema({
    _id: String,
    total: Number,
    items: [CartItemSchema]
});

CartSchema.methods.addItem = function(item, cb){
    console.log(item);
    this.items.push(item);
    this.save(cb);
};

mongoose.model('Cart', CartSchema);