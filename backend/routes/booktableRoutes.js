const express = require("express");
const router = express.Router();
const db = require("../database");

const BookingsModel = require("../models/Bookings.js");

router.get("/searchtables/", async (req, res) => {
  console.log("Starting get...", req.params.name);
  try {
    const bookings = await BookingsModel.find({ name: req.params.name });
    console.log(bookings);
    res.send(bookings);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
