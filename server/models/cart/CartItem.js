var mongoose = require('mongoose');

var CartItemSchema = new mongoose.Schema({
    _id:        String,
    images:     Array,
    title:      String,
    price:      Number,
    qty:        Number
});

mongoose.model('CartItem', CartItemSchema);

module.exports = CartItemSchema;

