var mongoose = require('mongoose');

var CartItemSchema = new mongoose.Schema({
    _id:                String,
    images:             Array,
    title:              String,
    price:              Number,
    mainImageIndex:     {type: Number, default: 0},
    qty:                {type: Number, default: 1},
    total:              Number
});

mongoose.model('CartItem', CartItemSchema);

module.exports = CartItemSchema;

