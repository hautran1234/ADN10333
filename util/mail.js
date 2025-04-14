const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'hau2k4lc@gmail.com',
      pass: 'rilsapissqhxuuhr'
    }
  });

module.exports = { transporter };
