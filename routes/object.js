var express = require('express');
const SINHVIEN = require('../models/SINHVIEN');
var router = express.Router();

var listData= [
    {
        "mssv": 1,
        "hoten": "Hung",
        "lop": 18402,
        "dtb": 6.5
    },
    {   "mssv": 2,
        "hoten": "Hao",
        "lop": 18402,
        "dtb": 7.7
    },
    {    "mssv": 3,
        "hoten": "Hau",
        "lop": 18402,
        "dtb": 5.0
    },
    {
        "mssv": 4,
        "hoten": "Hang",
        "lop": 18401,
        "dtb": 9.0
    },
    {
        "mssv": 5,
        "hoten": "Trinh",
        "lop": 18401,
        "dtb": 9.6
    }
];
////get: la lay, post:them , put:sua, delete:xoa
// lay danh sach thong tin cua cac sinh vien
//localhost:4000/object/list
 router.get("/list",function(req, res){
    res.status(200).json({success: true, message:"thanh cong",list: listData});

 });
 //them moi mot sinh vien
 //localhost:4000/object/add
 router.post("/add",function(req, res){

  const {mssv, hoten, lop,dtb} = req.body;

  var newItem = {mssv, hoten,lop, dtb};

  listData.push(newItem);
  
  res.status(200).json({success: true, message:"thanh cong",listData});

 });

 //thay doi thong tin sinh vien theo mssv
//locahost:4000/object/update
 router.put("/update",function(req, res){
    const {mssv, hoten, lop, dtb} = req.body;

    var itemUpdate = listData.find(p => p.mssv == mssv);
    
    if(!itemUpdate){
        res.status(400).json({success:false, message:"khong tim thay thong tin sinh vien"});

    }else{
        itemUpdate.hoten = hoten ? hoten : itemUpdate.hoten;
        itemUpdate.lop = lop ? lop : itemUpdate.lop;
        itemUpdate.dtb = dtb ? dtb : itemUpdate.dtb;
        res.status(200).json({success: true, message:"thanh cong"});
    }
 });

 //xoa mot sinh vien ra khoi danh sach
//localhost:4000/products/delete/1
 router.delete("/delete/:mssv",function(req, res){
    const {mssv} = req.params;

    var indexItem = listData.findIndex(p => p.mssv == mssv);
    
    if(indexItem == -1){
        res.status(400).json({success: false,message:"khong tim thay"});

    }else{
        listData.splice(indexItem,1);
        res.status(200).json({success: true, message:"thanh cong"});
    }
    


 });
 //lay thong tin chi tiet cua mot sinh vien theo mssv
 //params: localhost:4000/object/detail/1
 router.get("/detail/:mssv",function(req, res){
    const {mssv} = req.params;
   
    var item = listData.find(p => p.mssv == mssv);

    if (!item){
        res.status(400).json({success: false, message:"khong tim thay"});
    }else{
        res.status(200).json({success: true, message:"thanh cong",data: item});
    }
 });

 //lay danh sach cac sinh vien co dtb tu 6.5 dn 8.0
 //localhost/object/range?min=6.5&max=8.0
 router.get("/range",function(req,  res){
    const {min, max} = req.query;
    var list = listData.filter(p =>  p.dtb >= Number(min) && p.dtb <= Number(max));
    res.status(200).json({success: true, message:"thanh cong",list: list});

 });
 //lay danh sach cua cua cac sinh vien thuoc lop MD18401 co diem trung binh lon hon 9
 //localhost:4000/object/class/18401
 router.get("/class/:lop",function(req, res){
    const  {lop} = req.params;
     
    var item = listData.filter(p => p.lop == lop);
    if(!item){
        res.status(400).json({success: false , message:"khong tim thay"});

    }else{
        res.status(200).json({success: true, message:"thanh cong",data: item});
    }

 });
 //sap xep danh sach sinh vien theo dtb
//localhost:4000/object/sorted
 router.get("/sorted",function(req, res){

    var list = listData.sort((a,b) =>  a.dtb - b.dtb);
    res.status(200).json({success: true, message:"thanh cong", list : list});
 });

 //sinh vien co dtb cao nhat lop md18401 
//localhost:4000/object/class/18401
 router.get("/class/:lop/top", function (req, res) {
    const { lop } = req.params;

    var list = listData.filter(p => p.lop == lop);

    if (!list[0]) {  
        res.status(400).json({ success: false, message: "Không tìm thấy" });
    } else {
        var topStudent = list.reduce((max, student) => (student.dtb > max.dtb ? student : max), list[0]);

        res.status(200).json({ success: true, message: "thanh  cong", data: topStudent });
    }
})

 
 module.exports = router;