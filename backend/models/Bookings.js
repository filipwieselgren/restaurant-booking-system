const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bokingsSchema = new Schema({
  name: { type: String, required: true },
  amountOfPeople: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: Number, required: true },
  email: { type: String, required: true },
  phone: Number,
});

const BookingsModel = mongoose.model("bookings", bokingsSchema);

module.exports = BookingsModel;
