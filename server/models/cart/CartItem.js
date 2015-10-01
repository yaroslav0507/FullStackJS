var mongoose = require('mongoose');

var CartItemSchema = new mongoose.Schema({
    _id:        String,
    price:      Number,
    qty:        String
});

mongoose.model('CartItem', CartItemSchema);