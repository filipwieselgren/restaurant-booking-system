const express = require("express");
const app = express();
const router = express.Router();
const { ObjectId } = require("mongodb");
const sendEmailConfirmation = require("../functions/sendEmail");

const BookingsModel = require("../models/Bookings.js");
const AdminModel = require("../models/Admin.js");

router.post("/login", async (req, res) => {
  const admin = await AdminModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (admin) {
    res.send("true");
  } else {
    res.send("false");
  }
});

router.get("/login", async (req, res) => {
  const getBookings = await BookingsModel.find();

  getBookings.sort((a, b) => new Date(a.date) - new Date(b.date));

  res.send(getBookings);
});

router.get("/bookings/:id", async (req, res) => {
  const id = ObjectId(req.params.id);
  try {
    const singleBooking = await BookingsModel.findOne({ _id: id });
    res.status(200).send(singleBooking);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

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

  res.status(201).send(editBooking);
});

router.delete("/bookings/:id/delete", async (req, res) => {
  const id = ObjectId(req.params.id);
  try {
    const deletedBooking = await BookingsModel.findByIdAndDelete(id);
    if (!deletedBooking) return res.status(404);
    return res.send(deletedBooking);
  } catch (e) {
    return res.status(400);
  }
});

router.delete("/cancel/:id", async (req, res) => {
  const cancelid = req.params.id;
  try {
    const deletedBooking = await BookingsModel.findOneAndDelete({
      cancelid: cancelid,
    });
    const sendThisWhenCancelled = {
      from: "filipwieselgren@gmail.com",
      to: deletedBooking.email,
      subject: `Your booking has been canceled`,
      html: `<h1>Hi ${deletedBooking.name}, your booking has been canceled. We hope to see you some other time! 💚</h1>`,
    };

    sendEmailConfirmation(sendThisWhenCancelled, res);
  } catch (error) {
    console.log(error);
  }
});

router.get("/bookings/:searchInput/search", async (req, res) => {
  const searchInput = req.params.searchInput;

  const bookingsAdmin = await BookingsModel.find();

  const searchResults = bookingsAdmin.filter((b) => {
    return b.email.includes(searchInput);
  });

  res.status(200).send(searchResults);
});

router.get("/:id/:date/:tables/:time", async (req, res) => {
  const date = req.params.date;
  const id = req.params.id;
  const tables = +req.params.tables;
  const time = +req.params.time;

  let booking = {};

  const maxTables = 3;
  const biggerBooking = 1;
  let tablesForId = 0;

  let tablesAtSix = 0;
  let tablesAtNine = 0;

  const bookings = await BookingsModel.find({ date });

  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i]._id.toString() === id) {
      booking = bookings[i];
      tablesForId = bookings[i].tables;
    }
  }

  const sixaclockArr = bookings.filter((date) => {
    return date.time === 18;
  });

  for (let i = 0; i < sixaclockArr.length; i++) {
    if (sixaclockArr[i].tables === 2) {
      tablesAtSix += 2;
    } else {
      tablesAtSix += 1;
    }
  }

  const nineaclockArr = bookings.filter((date) => {
    return date.time === 21;
  });

  for (let i = 0; i < nineaclockArr.length; i++) {
    if (nineaclockArr[i].tables === 2) {
      tablesAtNine += 2;
    } else {
      tablesAtNine += 1;
    }
  }

  let ifBookingIsAtSix = false;
  let ifBookingIsAtNine = false;

  if (time === 18) {
    for (let i = 0; i < sixaclockArr.length; i++) {
      if (sixaclockArr[i]._id.toString() === id) {
        ifBookingIsAtSix = true;
      }
    }
  }

  if (time === 21) {
    for (let i = 0; i < nineaclockArr.length; i++) {
      if (nineaclockArr[i]._id.toString() === id) {
        ifBookingIsAtNine = true;
      }
    }
  }

  if (ifBookingIsAtNine) {
    if (tablesAtNine - tablesForId + tables + tablesAtSix <= 6) {
      if (tables === 2) {
        if (
          tablesAtNine - tablesForId + tables <= biggerBooking &&
          tablesAtSix <= biggerBooking
        ) {
          const bothTimesAvaTwo = { sixaclock: true, nineaclock: true };
          res.status(200).send(bothTimesAvaTwo);
        }

        if (
          tablesAtSix <= biggerBooking &&
          tablesAtNine - tablesForId + tables > biggerBooking
        ) {
          const onlySixAvaTwo = { sixaclock: true, nineaclock: false };
          res.status(200).send(onlySixAvaTwo);
        }

        if (
          tablesAtSix > biggerBooking &&
          tablesAtNine - tablesForId + tables <= biggerBooking
        ) {
          const onlyNineAvaTwo = { sixaclock: false, nineaclock: true };
          res.status(200).send(onlyNineAvaTwo);
        }
      }

      if (tables === 1) {
        if (
          tablesAtSix < maxTables &&
          tablesAtNine - tablesForId + tables < maxTables
        ) {
          const bothTimesAvaOne = { sixaclock: true, nineaclock: true };
          res.status(200).send(bothTimesAvaOne);
        }

        if (
          tablesAtSix < maxTables &&
          tablesAtNine - tablesForId + tables >= maxTables
        ) {
          const onlySixAvaOne = { sixaclock: true, nineaclock: false };
          res.status(200).send(onlySixAvaOne);
        }

        if (
          tablesAtSix >= maxTables &&
          tablesAtNine - tablesForId + tables < maxTables
        ) {
          const onlyNineAvaOne = { sixaclock: false, nineaclock: true };
          res.status(200).send(onlyNineAvaOne);
        }
      }
    } else {
      const bothTimesFull = { sixaclock: false, nineaclock: false };
      res.send(bothTimesFull);
    }
  }

  if (ifBookingIsAtSix) {
    if (tablesAtSix - tablesForId + tables + tablesAtNine <= 6) {
      if (tables === 2) {
        if (
          tablesAtSix - tablesForId + tables <= biggerBooking &&
          tablesAtNine <= biggerBooking
        ) {
          const bothTimesAvaTwo = { sixaclock: true, nineaclock: true };
          res.status(200).send(bothTimesAvaTwo);
        }

        if (
          tablesAtSix - tablesForId + tables <= biggerBooking &&
          tablesAtNine > biggerBooking
        ) {
          const onlySixAvaTwo = { sixaclock: true, nineaclock: false };
          res.status(200).send(onlySixAvaTwo);
        }

        if (
          tablesAtSix - tablesForId + tables > biggerBooking &&
          tablesAtNine <= biggerBooking
        ) {
          const onlyNineAvaTwo = { sixaclock: false, nineaclock: true };
          res.status(200).send(onlyNineAvaTwo);
        }
      }

      if (tables === 1) {
        if (
          tablesAtSix - tablesForId + tables < maxTables &&
          tablesAtNine < maxTables
        ) {
          const bothTimesAvaOne = { sixaclock: true, nineaclock: true };
          res.status(200).send(bothTimesAvaOne);
        }

        if (
          tablesAtSix - tablesForId + tables < maxTables &&
          tablesAtNine >= maxTables
        ) {
          const onlySixAvaOne = { sixaclock: true, nineaclock: false };
          res.status(200).send(onlySixAvaOne);
        }

        if (
          tablesAtSix - tablesForId + tables >= maxTables &&
          tablesAtNine < maxTables
        ) {
          const onlyNineAvaOne = { sixaclock: false, nineaclock: true };
          res.status(200).send(onlyNineAvaOne);
        }
      }
    } else {
      const bothTimesFull = { sixaclock: false, nineaclock: false };
      res.send(bothTimesFull);
    }
  }
});

module.exports = router;
