var express = require('express');
var router = express.Router();
var fs = require('fs');  
var path = require('path');  // xử lý đường dẫn tệp
var sendMail = require("../util/mail");  
var userModel = require("../models/user");
const JWT = require('jsonwebtoken');
const config = require("../util/config");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//localhost:4000/users/register
router.post('/register', async function (req,res) {
  const {username, password, name} = req.body;

  const newUser = {username, password, name};
  await userModel.create(newUser);
  res.status(200).json({status: true, message:"Dang Ky thanh cong"});
  
});

//localhost:4000/users/login
router.post('/login', async function (req,res) {
  const {username, password} = req.body;

  const user = await userModel.findOne({username: username, password: password});

  if(!user){
    res.status(400).json({status: false, message:"Dang Ky khong thanh cong"});
  }else{
    const token = JWT.sign({id: user.username},config.SECRETKEY,{expiresIn: '30s'});
    const refreshToken = JWT.sign({id: user.username},config.SECRETKEY,{expiresIn: '1d'});
    res.status(200).json({status: true, message:"Dang Ky thanh cong", token: token, refreshToken});
  }
})

// localhost:4000/users/sendmail
router.post("/sendmail", async function(req, res, next) {
  try {
   
    const { to, subject } = req.body;

    
    const htmlContent = fs.readFileSync(path.join(__dirname, "../util/mai.html"), "utf-8"); 

    
    const mailOptions = {
      from: "Trần Công Hậu <hau2k4lc@gmail.com>", 
      to: to,  
      subject: subject,  
      html: htmlContent,  
    };


    await sendMail.transporter.sendMail(mailOptions);

    res.json({ status: 1, message: "Gửi mail thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Gửi mail thất bại", error: err });
  }
});

module.exports = router;
