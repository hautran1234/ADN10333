var express = require('express');
var router = express.Router();
var category = require('../models/category');

// lay danh sach category
// localhost:4000/category/list
router.get("/list", async function(req, res){
    var list = await category.find();
    res.status(200).json({status: true, message: " thanh cong",list : list});
});

//lay thong tin danh muc theo ten
// localhost:4000/category/search?ten=Bánh
router.get("/search", async function (req, res){
    const {ten} = req.query;
    var list = await category.find({name: ten});
    res.status(200).json({status: true, message: " thanh cong",list : list});
})

module.exports = router;
