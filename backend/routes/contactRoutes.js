const express = require("express");
const router = express.Router();

const ContactModel = require("../models/Contact");

//posta mail från användare till Restaurangens databas
router.post("/send", async (req, res) => {
  const contactName = req.body.name;
  const contactEmail = req.body.email;
  const contactMessage = req.body.message;

  const newMessage = new ContactModel({
    name: contactName,
    email: contactEmail,
    message: contactMessage,
  });

  newMessage.save();
  res.status(201).send(newMessage);
});

module.exports = router;
