const mongoose = require('mongoose');
const Schema = mongoose.Schema;// colectionm trong mongodbdb
const ObjectId = Schema.ObjectId;// tạo objectid trong mongodb
const product = new Schema({
    id: { type: ObjectId }, 
    name: {type: String},
    price: {type: Number},
    quantity: {type: Number},
    category: {type: ObjectId, ref: 'category'}
});
module.exports = mongoose.models.product || mongoose.model('product', product);