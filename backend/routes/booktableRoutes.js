const express = require("express");
const router = express.Router();
const db = require("../database");

const BookingsModel = require("../models/Bookings.js");

router.post("/searchtables/", async (req, res) => {
  console.log("postar");
  const person1 = new BookingsModel({
    name: "hejhej",
    date: "18 maj",
    amountOfPeople: 6,
    time: 18,
    email: "tuvis@hej",
    phone: 123456789,
  });

  person1.save();
  console.log("p1", person1);
});

router.get("/searchtables/", async (req, res) => {
  console.log("Starting get...");
  try {
    const bookings = await BookingsModel.find();
    console.log(bookings);
    res.send(bookings);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
