var express = require('express');
var router = express.Router();
var database = require('../models/database');



//localhost:4000/database/list
router.get("/list", async function(req, res){
    var list = await database.find();
    res.status(200).json({status: true, message: " thanh cong",list : list});
});

//lay thong tin danh muc theo ten
// localhost:4000/database/search?ten=Hậu
router.get("/search", async function (req, res){
    const {ten} = req.query;
    var list = await database.find({name: ten});
    res.status(200).json({status: true, message: " thanh cong",list : list});
})

module.exports = router;