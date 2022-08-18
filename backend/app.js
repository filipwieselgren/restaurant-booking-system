require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("./database.js");

app.use(express.json());

const BookingsModel = require("./models/Bookings.js");

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
