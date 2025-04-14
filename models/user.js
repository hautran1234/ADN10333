const mongoose = require('mongoose');
const Schema = mongoose.Schema;// colectionm trong mongodbdb
const ObjectId = Schema.ObjectId;// tạo objectid trong mongodb
const user = new Schema({
    id: { type: ObjectId }, // khóa chính
    username:{type: String},
    password:{type: String},
    name:  {
        type: String, // kiểu dữ liệu
    },
});
module.exports = mongoose.models.user || mongoose.model('user', user);