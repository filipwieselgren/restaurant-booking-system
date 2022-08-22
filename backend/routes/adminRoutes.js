const express = require("express");
const router = express.Router();

const BookingsModel = require("../models/Bookings.js");

router.get("/login", async (req, res) => {
  const getBookings = await BookingsModel.find();

  getBookings.sort((a, b) => new Date(b.date) - new Date(a.date));

  res.send(getBookings);
});

module.exports = router;
