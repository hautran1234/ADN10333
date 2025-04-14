const mongoose = require('mongoose');
const Schema = mongoose.Schema;// colectionm trong mongodbdb
const ObjectId = Schema.ObjectId;// tạo objectid trong mongodb
const SINHVIEN = new Schema({
    id: { type: ObjectId }, 
    name: {type: String},
    mssv: {type: Number},
    dtb: {type: Number},
    subject: {type: String},
    age: {type: Number},
    category: {type: ObjectId, ref: 'database'}
    
});
module.exports = mongoose.models.SINHVIEN || mongoose.model('SINHVIEN', SINHVIEN);