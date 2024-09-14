const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');
require("dotenv").config();

const sendMail = async () => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODE_USERNAME, // Your email address
        pass: process.env.PASSWORD, // use app password
      },
    });

    const filePath = path.join(__dirname, 'template.html');
    const htmlContent = fs.readFileSync(filePath, 'utf-8');

    let info = await transporter.sendMail({
      from: `<${process.env.NODE_USERNAME}>`,
      to: process.env.SEND_TO, // provide emails as comma seperated strings if there are more
      subject: "Testing, testing, 123",
      html: htmlContent, // can also use inline html
    });

    console.log(info.messageId);
  } catch (e) {
    console.log(e);
  }
};
sendMail();