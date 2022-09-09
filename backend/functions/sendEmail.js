const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
app.use(cors());

module.exports = sendEmailConfirmation = (sendThisToMail, res) => {
  const contactEmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "filipwieselgren@gmail.com",
      pass: "kztcpyrswulhulsn",
    },
  });

  contactEmail.verify((error) => {
    if (error) {
      console.log("This is why it's not working:", error);
    } else {
      console.log("Ready to Send");
    }
  });

  contactEmail.sendMail(sendThisToMail, async (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
};
