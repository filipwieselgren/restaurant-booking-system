const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const BookingsModel = require("../models/Bookings.js");
const AdminModel = require("../models/Admin.js");

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

  console.log("fins admin", admin);
});

router.get("/login", async (req, res) => {
  const getBookings = await BookingsModel.find();

  getBookings.sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log(getBookings.length);

  res.send(getBookings);
});

// Steg 1 - kollar tid

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

router.post("/create/:amountOfPeople/:date/:time", async (req, res) => {
  const postDateAdmin = req.params.date;
  const postAmoutAdmin = req.params.amountOfPeople;
  const postTimeAdmin = req.params.time;

  const newBookingAdmin = new BookingsModel({
    name: req.body.name,
    date: postDateAdmin,
    amountOfPeople: postAmoutAdmin,
    time: postTimeAdmin,
    email: req.body.email,
    phone: req.body.phone,
  });

  newBookingAdmin.save();
  console.log("newBooking", newBookingAdmin);
  res.status(201).send(newBookingAdmin);
});

// ANVÄNDS EJ, TA BORT?
// router.get("/bookings/:id", async (req, res) => {
//   const id = ObjectId(req.params.id);
//   console.log(id);

//   const singleBooking = await BookingsModel.find({ _id: id });
//   console.log(singleBooking);
//   res.status(201).send(singleBooking);
// });

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

// Sök efter bokning
router.get("/bookings/:email/search", async (req, res) => {
  const getEmail = req.params.email;

  const bookingsAdmin = await BookingsModel.find();

  const dateBookingsAdmin = bookingsAdmin.filter((booking) => {
    return booking.email.trim() === getEmail.trim();
  });

  console.log(dateBookingsAdmin);
  res.status(200).send(dateBookingsAdmin);
});

module.exports = router;
