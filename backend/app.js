require("dotenv").config();
require("./database.js");

mongoose = require("mongoose");

const booktableRoutes = require("./routes/booktableRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const AdminModel = require("./models/Admin.js");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());

app.use(express.json());

//const BookingsModel = require("./models/Bookings.js");

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/booktable", booktableRoutes);
app.use("/admin", adminRoutes);
app.use("/contact", contactRoutes);

const port = 8080;
/* app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
}); */

const URI = process.env.MONGODBKEY;

/* mongoose
  .connect(URI)
  .then((result) => {
    app.listen(port);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  }); */

mongoose
  .connect(URI)
  .then((result) => {
    app.listen(port);
    console.log("connected");

    AdminModel.findOne().then((admin) => {
      if (!admin) {
        const admin = new AdminModel({
          email: "admin@test.com",
          password: "admin1234",
        });
        admin.save();
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
