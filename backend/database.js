const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGODBKEY;

mongoose.connect(URI);
