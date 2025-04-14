const jwt = require("jsonwebtoken");
const config = require("../util/config");

function checkToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1]; // Lấy token từ header

    if (!token) {
        return res.status(401).json({ status: false, message: "Không có token" });
    }

    jwt.verify(token, config.SECRETKEY, function (err, decoded) {
        if (err) {
            return res.status(403).json({ status: false, message: "Token không hợp lệ" });
        }

        req.user = decoded; // Lưu thông tin vào req nếu cần
        next(); // Cho phép đi tiếp
    });
}

module.exports = checkToken;
