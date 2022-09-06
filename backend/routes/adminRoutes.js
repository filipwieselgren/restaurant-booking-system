const express = require("express");
const app = express();
const router = express.Router();
const { ObjectId } = require("mongodb");
const sendEmailConfirmation = require("../functions/sendEmail");

const BookingsModel = require("../models/Bookings.js");
const AdminModel = require("../models/Admin.js");

//admin login
router.post("/login", async (req, res) => {
  const admin = await AdminModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (admin) {
    res.send("true");
    console.log("användare finns");
  } else {
    res.send("false");

    console.log("användare finns inte");
  }

  console.log("find admin", admin);
});

router.get("/login", async (req, res) => {
  const getBookings = await BookingsModel.find();

  getBookings.sort((a, b) => new Date(a.date) - new Date(b.date));

  res.send(getBookings);
});

//hämta single booking
router.get("/bookings/:id", async (req, res) => {
  const id = ObjectId(req.params.id);
  try {
    const singleBooking = await BookingsModel.findOne({ _id: id });
    res.status(200).send(singleBooking);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// ANVÄNDS DENNA?
router.get("/:date", async (req, res) => {
  try {
    const date = req.params.date;

    const bookings = await BookingsModel.find({ date });

    const sixaclockArr = bookings.filter((date) => {
      return date.time === 18;
    });
    const nineaclockArr = bookings.filter((date) => {
      return date.time === 21;
    });
    const maxAmountOfTables = 2;
    if (sixaclockArr.length < 1 && nineaclockArr.length < maxAmountOfTables) {
      const bothTimes = { sixaclock: true, nineaclock: true };
      res.status(200).send(bothTimes);
    } else if (sixaclockArr.length < maxAmountOfTables) {
      const sixOnlyAvalible = { sixaclock: true, nineaclock: false };

      res.status(200).send(sixOnlyAvalible);
    } else if (nineaclockArr.length < maxAmountOfTables) {
      const nineOnlyAvalible = { sixaclock: false, nineaclock: true };

      res.status(200).send(nineOnlyAvalible);
    }
  } catch (error) {
    console.log(error);
  }
});

//ändra single bokning
router.post("/bookings/:id/edit", async (req, res) => {
  const id = ObjectId(req.params.id);
  const editBooking = {
    name: req.body.name,
    date: req.body.date,
    amountOfPeople: req.body.amountOfPeople,
    time: req.body.time,
    email: req.body.email,
    phone: req.body.phone,
    cancelid: req.body.cancelid,
    tables: req.body.tables,
  };

  await BookingsModel.updateOne({ _id: id }, { $set: editBooking });

  console.log(editBooking);
  res.status(201).send(editBooking);
});

//ta bort single bokning
router.delete("/bookings/:id/delete", async (req, res) => {
  const id = ObjectId(req.params.id);
  try {
    const deletedBooking = await BookingsModel.findByIdAndDelete(id);
    if (!deletedBooking) return res.status(404);
    console.log(deletedBooking);
    return res.send(deletedBooking);
  } catch (e) {
    return res.status(400);
  }
});

router.delete("/cancel/:id", async (req, res) => {
  const cancelid = req.params.id;
  try {
    console.log(cancelid);
    const deletedBooking = await BookingsModel.findOneAndDelete({
      cancelid: cancelid,
    });

    // Måste skicka med e-post, namn och res
    sendEmailConfirmation(deletedBooking.email, deletedBooking.name, res);
  } catch (error) {
    console.log(error);
  }
});

// Sök efter bokning via mail
router.get("/bookings/:searchInput/search", async (req, res) => {
  const searchInput = req.params.searchInput;

  const bookingsAdmin = await BookingsModel.find();

  const searchResults = bookingsAdmin.filter((b) => {
    return b.email.includes(searchInput);
  });

  console.log(searchResults);
  res.status(200).send(searchResults);
});

module.exports = router;
