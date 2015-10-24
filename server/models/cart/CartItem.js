var mongoose = require('mongoose');

var CartItemSchema = new mongoose.Schema({
    _id:        String,
    images:     Array,
    title:      String,
    price:      Number,
    qty:        {type: Number, default: 1}
});

mongoose.model('CartItem', CartItemSchema);

module.exports = CartItemSchema;

