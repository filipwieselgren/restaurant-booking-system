const express = require("express");
const router = express.Router();
const db = require("../database");

const BookingsModel = require("../models/Bookings.js");

router.get("/searchtables", async (req, res) => {
  res.send("Hello from booking router...");
});

module.exports = router;
