require("dotenv").config();
require("./database.js");
require("mongoose");

const booktableRoutes = require("./routes/booktableRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");

const express = require("express");
const app = express();

app.use(express.json());

//const BookingsModel = require("./models/Bookings.js");

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/booktable/", booktableRoutes);
app.use("/admin", adminRoutes);
app.use("/contact", contactRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
