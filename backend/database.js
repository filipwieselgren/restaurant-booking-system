const mongoose = require("mongoose");

try {
  mongoose.connect(
    process.env.MONGODBKEY,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}
