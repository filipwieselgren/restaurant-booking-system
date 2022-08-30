const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bokingsSchema = new Schema({
  name: { type: String, required: true },
  amountOfPeople: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: Number, required: true },
  email: { type: String, required: true },
  phone: Number,
  cancelid: { type: String, required: true },
  tables: { type: Number, required: true },
});

const BookingsModel = mongoose.model("bookings", bokingsSchema);

module.exports = BookingsModel;
