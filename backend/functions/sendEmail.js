const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
app.use(cors());

module.exports = sendEmailConfirmation = (email, name, res) => {
  const contactEmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "filipwieselgren@gmail.com",
      pass: "kztcpyrswulhulsn",
    },
  });

  contactEmail.verify((error) => {
    if (error) {
      console.log("This is  why it working:", error);
    } else {
      console.log("Ready to Send");
    }
  });

  const customer = name;
  const mail = {
    from: customer,
    to: email,
    subject: `Your booking has been canceled`,
    html: `<h1>Hi ${customer}, your booking has been canceled. We hope to see you some other time! 💚</h1>`,
  };
  contactEmail.sendMail(mail, async (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
};
