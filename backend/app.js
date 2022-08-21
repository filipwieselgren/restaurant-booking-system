require("dotenv").config();
require("./database.js");

const booktableRoutes = require("./routes/booktableRoutes");
const adminRoutes = require("./routes/adminRoutes");

const express = require("express");
const app = express();

app.use(express.json());

//const BookingsModel = require("./models/Bookings.js");

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/booktable/", booktableRoutes);
app.use("/admin", adminRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
