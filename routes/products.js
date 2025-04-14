var express = require('express');
var router = express.Router();

var product = require("../models/product");
var upload = require("../util/upload");
const JWT = require('jsonwebtoken');
const config = require("../util/config");
//localhost:4000/products/upload 1 file
router.post('/upload', [upload.single('image')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
                return res.json({ status: 0, link: "" });
            } else {
                const url = `http://localhost:4000/images/${file.filename}`;
                return res.json({ status: 1, url: url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({ status: 0, link: "" });
        }
    });



// localhost:4000/products/multiple 3 file
router.post('/multiple', [upload.array('images', 3)],
    async (req, res, next) => {
        try {
            const { files } = req;
            if (!files || files.length === 0) {
                return res.json({ status: 0, links: [] });
            } else {
                const urls = files.map(file => `http://localhost:4000/images/${file.filename}`);
                return res.json({ status: 1, urls: urls });
            }
        } catch (error) {
            console.log('Upload multiple images error:', error);
            return res.json({ status: 0, links: [] });
        }
    });













//them mot san pham moi
//localhost:4000/products/add
router.post("/add", async function (req, res) {
    const { name, price, quantity, category } = req.body;

    var newItem = { name, price, quantity, category };

    await product.create(newItem);

    res.status(200).json({ status: true, message: "thanh cong" });
});

//chinh sua thong tin san pham 
//localhost:4000/products/editedit
router.put("/edit", async function (req, res) {
    const { id, name, price, quantity, category } = req.body;

    // var itemUpdate = await product.find({_id: id});
    // var itemUpdate = await product.findOne(id);// tim thang dau tien roi tra ve
    var itemUpdate = await product.findById(id);

    if (!itemUpdate) {
        res.status(400).json({ status: false, message: "khong thay" });
    } else {
        itemUpdate.name = name ? name : itemUpdate.name;
        itemUpdate.price = price ? price : itemUpdate.price;
        itemUpdate.quantity = quantity ? quantity : itemUpdate.quantity;
        itemUpdate.category = category ? category : itemUpdate.category;

        await itemUpdate.save();

        res.status(200).json({ status: true, message: "thanh cong" });
    }


});
//xoa san pham
//localhost:4000/products/delete/id
router.delete("/delete/:id", async function (req, res) {
    const { id } = req.params;
    await product.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "thanh cong" });

});
//list danh sach san pham lon hon 3000 hoac so luong be hon 10
router.get("/list", async function (req, res) {



    const token = req.header("Authorization").split(' ')[1];
    if (token) {
        JWT.verify(token, config.SECRETKEY, async function (err, id) {
            if (err) {
                res.status(403).json({ "status": 403, "err": err });
            } else {
                var list = await product.find({ $or: [{ price: { $gt: 3000 } }, { quantity: { $lt: 10 } }] });// find({},"name price category").populate("category"); neu chi muon goi chuc nang gi thi chi can lam nhu vay
                res.status(200).json({ status: true, message: "thanh cong", list: list });

            }
        });
    } else {
        res.status(401).json({ "status": 401 });
    }



})








// //du lieu mau
// var listData = [
//     {
//         "id": 1,
//         "name": "banh",
//         "price":  5000
//     },
//     {
//         "id": 2,
//         "name": "keo",
//         "price":  7000
//     },
//     {
//         "id": 3,
//         "name": "trai cau",
//         "price":  10000
//     },
// ];

// //get: la lay, post:them , put:sua, delete:xoa
// //lay danh sach san pham
// //localhost:4000/products/list
// router.get("/list",function(req, res ){
//    res.status(200).json({success: true, message: "thanh cong", list: listData});
// });


// // lay thong tin san pham theo id
// //query: localhost:4000/products/detail?id=1
// //params: localhost:4000/products/detail/1
// router.get("/detail/:id",function (req, res){   
//        const {id} = req.params;
//        var item = listData.find(p => p.id == id);
//        if (!item){
//         res.status(400). json({success: false, message:"khong tim thay"});
//        }else{
//         res.status(200). json({success: true, message:"thanh cong",data: item});
//        }

// });
// //lay danh sach san pham co gia  tu min den max
// //params: localhost:4000/products/range/6000/11000
// router.get("/range/:min/:max", function(req, res){
//     const {min, max} = req.params;
//     var list = listData.filter(p => p.price >= Number(min) && p.price <= Number(max));
//     res.status(200).json({success: true, message:"thanh cong",list: list});

// });

// // them san pham moi
// //localhost:4000/products/add
// router.post("/add",function(req, res){
//     const {id, name, price} = req.body;

//     var newItem = {id, name, price};// ocject them vao

//     listData.push(newItem);

//     res.status(200).json({success: true, message:"thanh cong", listData});
// });

// //cap nhat thong tin mot san pham bat ki theo id
// //localhost:4000/products/update
// router.put("/update",function(req, res){
//     const{id, name, price} =  req.body;

//     var itemUpdate = listData.find(p => p.id == id);

//     if(!itemUpdate){
//         res.status(400).json ({success: false, message:"khon tim thay san pham"});

//     }else{
//         itemUpdate.name = name ? name : itemUpdate.name;
//         itemUpdate.price = price ? price : itemUpdate.price;
//         res.status(200).json({success: true, message:"cap nhat thanh cong"});
//     }
// })

// //xoa san pham
// //localhost:4000/products/delete/1 
// router.delete("/delete/:id", function(req, res){
//      const {id} = req.params;

//      var indexItem = listData.findIndex(p => p.id == id);
//      if (indexItem == -1){
//         res.status(400).json({success: false, message:"khong tim thay"});
//      }else{
//         listData.splice(indexItem, 1);
//         res.status(200).json({success: true,message:"thanh cong"});
//      }

// })


module.exports = router;