var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
    _id: String,
    user_id: String,
    items: {
        item: {}
    },
    quantity: {type: Number, default: 0},
    total: Number
});

mongoose.model('Cart', CartSchema);