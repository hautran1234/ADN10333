const mongoose = require('mongoose');
const Schema = mongoose.Schema;// colectionm trong mongodbdb
const ObjectId = Schema.ObjectId;// tạo objectid trong mongodb
const database = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
    },
});
module.exports = mongoose.models.database || mongoose.model('database', database);