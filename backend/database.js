const mongoose = require("mongoose");

try {
  mongoose.connect(
    "mongodb://localhost/restaurant-booking-system",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}
