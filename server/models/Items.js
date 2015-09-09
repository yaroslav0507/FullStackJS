var mongoose = require('mongoose');

var ItemsSchema = new mongoose.Schema({
    title: String,
    shortDescription: String,
    price: {type: Number, default: 0}
});

mongoose.model('Items', ItemsSchema);