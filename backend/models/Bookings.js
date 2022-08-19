const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bokingsSchema = new Schema({
  name: { type: String, required: true },
  amountOfPeople: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: Number, required: true },
  email: { type: String, required: true },
  phone: Number,
});

const BookingsModel = mongoose.model("booking", bokingsSchema);

module.exports = BookingsModel;
