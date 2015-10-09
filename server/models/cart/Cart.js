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

CartSchema.methods.removeItem = function(id, cb){

    if(this.items.length > 0){
        for (var index = 0; index <= this.items.length; index++ ){
            if(this.items[index]._id === id){
                this.total -= this.items[index].price;
                this.items.splice(index, 1);
                break;
            }
        }
    }
    this.save(cb);
};

mongoose.model('Cart', CartSchema);