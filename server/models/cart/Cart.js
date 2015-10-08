var mongoose = require('mongoose');
var CartItemSchema = require('./CartItem');

var CartSchema = new mongoose.Schema({
    _id: String,
    total: Number,
    items: [CartItemSchema]
});

CartSchema.methods.addItem = function(item, cb){
    var that = this;
    this.items.push(item);

    this.total = 0;
    this.items.forEach(function(item){
        that.total += item.price;
    });

    this.save(cb);
};

mongoose.model('Cart', CartSchema);