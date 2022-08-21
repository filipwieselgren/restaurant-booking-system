const express = require("express");
const router = express.Router();
const db = require("../database");

const BookingsModel = require("../models/Bookings.js");

router.get("/searchtables/:date", async (req, res) => {
  console.log("Starting get...");

  try {
    const getDate = req.params.date;

    const bookings = await BookingsModel.find();

    const dateBookings = bookings.filter((booking) => {
      return booking.date === getDate;
    });

    if (dateBookings.length < 2) {
      res.status(200).send(dateBookings);
    } else {
      res.status.send("We are full this day. Please choose another day! 💚");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/searchtables/", async (req, res) => {
  const person1 = new BookingsModel({
    name: "Linnea",
    date: "2020-06-10",
    amountOfPeople: 6,
    time: 18,
    email: "tuvis@hej",
    phone: 123456789,
  });

  person1.save();
  console.log("p1", person1);
  res.send(person1);
});

module.exports = router;
