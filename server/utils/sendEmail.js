const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "meetpatel7991@gmail.com",
        pass: "yetquyjpijoeupfe",
      },
    });

    var mailOptions = {
      from: "meetpatel7991@gmail.com",
      to: email,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
//yetquyjpijoeupfe
