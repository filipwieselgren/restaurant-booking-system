const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGODBKEY;

mongoose.connect(URI);

/* try {
  mongoose.connect(
    process.env.MONGODBKEY,
    {
       useNewUrlParser: true, useUnifiedTopology: true 
    },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
} */

/* mongoose.connect(process.env.MONGODBKEY, {}, () => {
  console.log("Connected to DB");
}); */
