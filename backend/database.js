const mongoose = require("mongoose");
require("dotenv").config();

try {
  mongoose.connect(
<<<<<<< HEAD
    "mongodb://localhost/restaurant-booking-system",
=======
    "mongodb://localhost:27017/restaurant-booking-system",
>>>>>>> c1b597d8c96cb9b4d1ee47f19f91e3479eb2b481
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}
