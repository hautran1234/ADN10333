var express = require('express');
var router = express.Router();
var SINHVIEN = require('../models/SINHVIEN');
var checkToken = require('../util/checkToken'); // Import middleware

//đếm số lượng sinh vien trong danh sach
//localhost:4000/SINHVIEN/count
router.get("/count", checkToken, async function (req, res) {
    const count = await SINHVIEN.countDocuments();
    res.status(200).json({ status: true, message: "Tổng số sinh viên", count });
});

//lấy danh sách sinh viên chỉ name và mssvmssv
//localhost:4000/SINHVIEN/listname
router.get("/listname", checkToken, async function (req, res) {
    const list = await SINHVIEN.find({}, "name mssv");
    res.status(200).json({ status: true, message: "Danh sách tên", list });
});

//lấy những sinh viên có đúng độ tuổi 20
//localhost:4000/SINHVIEN/age/20 
router.get("/age/:age", checkToken, async function (req, res) {
    const { age } = req.params;
    const list = await SINHVIEN.find({ age: Number(age) });

    if (!list || list.length === 0) {
        return res.status(400).json({ status: false, message: "Không tìm thấy" });
    }

    res.status(200).json({ status: true, message: "Tìm thấy", list });
});

//lấy tổng số sinh viên của từng bộ môn
//localhost:4000/SINHVIEN/subject/summary
router.get("/subject/summary", checkToken, async function (req, res) {
    const result = await SINHVIEN.aggregate([
        {
            $group: {
                _id: "$subject",
                total: { $sum: 1 }
            }
        }
    ]);

    res.status(200).json({ status: true, message: "Tổng theo bộ môn", result });
});

// lấy sinh viên có tuổi nhỏ nhất 
//localhost:4000/SINHVIEN/youngest
router.get("/youngest", checkToken, async function (req, res) {
    const sv = await SINHVIEN.findOne().sort({ age: 1 });

    if (!sv) {
        return res.status(400).json({ status: false, message: "Không có sinh viên" });
    }

    res.status(200).json({ status: true, message: "Sinh viên nhỏ tuổi nhất", sv });
});









//lay toan bo danh sach sinh vien
//localhost:4000/SINHVIEN/list
router.get("/list", async function (req, res) {
    var item = await SINHVIEN.find();
    res.status(200).json({status: true, message:"thanh cong",item: item });
})


//Thêm mới một sinh viên mới
//localhost:4000/SINHVIEN/add
router.post("/add", async function(req, res){
   const {name, mssv, dtb, subject, age, category} = req.body;
   var newItem = {name, mssv, dtb, subject, age, category};

    await SINHVIEN.create(newItem);

    res.status(200).json({status: true , message:"thanh cong"});
});
// lay danh sach sinh vien cua khoa cntt
//localhost:4000/SINHVIEN/detail?subject=IT
router.get("/detail",async function (req, res) {
    const {subject}  = req.query;

    var item = await SINHVIEN.find({ subject });

    if(! item){
        res.status(400).json({status: false, message:"khong tim thay"});
    }else{
        res.status(200).json({status: true, message:"thanh cong",subject : item});
    }

    
});
//Lấy danh sách sản phẩm có điểm trung bình từ 6.5 đến 8.5
// localhost:4000/SINHVIEN/range
router.get("/range", async function (req, res) {
    var item = await SINHVIEN.find({dtb: {$gte: 6.5, $lte: 8.5}});
    res.status(200).json({status: true, message:"thanh cong",item : item});
    
});
//Tìm kiếm thông tin của sinh viên theo MSSV
// localhost:4000/SINHVIEN/search
router.get("/search", async function (req, res) {
    const { mssv} = req. query;

    var item = await SINHVIEN.findOne({mssv: Number(mssv)});

    if(! item){
        res.status(400).json({status: false, message:"khong tim thay"});
    }else{
        res.status(200).json({status: true, message:"thanh cong",item : item});
    }

});
//Thay đổi thông tin sinh viên theo MSSV
// localhost:4000/SINHVIEN/update
router.put("/update", async function (req, res) {
    const {name, mssv, dtb, subject, age } = req.body;

    var itemUpdate = await SINHVIEN.findOne({mssv: mssv});

    if(!itemUpdate){
        res.status(400).json({success:false, message:"khong tim thay thong tin sinh vien"});

    }
    if (name) itemUpdate.name = name;
    if (subject) itemUpdate.subject = subject;
    if (dtb) itemUpdate.dtb = dtb;
    if (age) itemUpdate.age = age;

    await itemUpdate.save();

    res.status(200).json({ success: true, message: "thanh cong" });

    
});
//Xóa một sinh viên ra khỏi danh sáchh
//localhost:4000/SINHVIEN/delete/idnetstat -ano | findstr :4000
   router.delete("/delete/:id", async function (req, res) {
   const {id} = req.params;
   await SINHVIEN.findByIdAndDelete(id);
   res.status(200).json({status: true,message:"thanh cong" });


    
});
//Lấy danh sách các sinh viên thuộc BM CNTT và có DTB từ 9.0
//localhost:4000/SINHVIEN/students/dtb
router.get("/students/dtb",async function (req, res) {
    const students = await SINHVIEN.find({subject:"IT", dtb: {$gte: 9.0}});
    
    if(! students || students.length === 0){
        res.status(400).json({status: false, message:"khong tim thay"});

    }
    
    res.status(200).json({status: true, message:"thanh cong",students});
});
//Lấy ra danh sách các sinh viên có độ tuổi từ 18 đến 20 thuộc CNTT có điểm trung bình từ 6.5
router.get("/students/IT", async function (req, res) {
    const students = await SINHVIEN.find({subject:"IT", age: {$gte: 18, $lte: 20}, dtb: {$gte: 6.5}});
    if(!students || students.length === 0){
        res.status(400).json({status: false, message:"khong tim thay"});
    }
    res.status(200).json({status: true, message:"thanh cong",students});
});

//Sắp xếp danh sách sinh viên theo điểm trung bình
//localhost:4000/SINHVIEN/sorted
 router.get("/sorted", async function  (req, res) {
    var list = await SINHVIEN.find().sort({dtb: 1});

    res.status(200).json({status: true, message:"thanh cong", list});
    
 });
 //Tìm sinh viên có điểm trung bình cao nhất thuộc BM CNTT
 //localhost:4000/SINHVIEN/class/dtb
 router.get("/class/dtb", async function (req, res) {
    const topStudent = await SINHVIEN.findOne({subject: "IT"}).sort({dtb: -1});
    if(!topStudent){
        res.status(400).json({status: false, message:"khong tim thay"});
    }
    res.status(200).json({status: true, message:"thanh cong",topStudent});
    
 })


module.exports = router;