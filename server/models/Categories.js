var mongoose = require('mongoose');

var CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        default: 'uncategorized'
    }
});

mongoose.model('Categories', CategoriesSchema);

module.exports = CategoriesSchema;