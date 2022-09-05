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
    console.log("find by id", singleBooking);
    res.status(200).send(singleBooking);
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

// ANVÄNDS DENNA?
/* router.get("/:date", async (req, res) => {
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
}); */

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

router.get("/:id/:date/:tables", async (req, res) => {
  console.log("startar");
  const date = req.params.date;
  const id = req.params.id;
  const tables = req.params.tables;

  let booking = {};

  const maxTables = 3;
  const biggerBooking = 1;
  let tablesForId = 0;

  let tablesAtSix = 0;
  let tablesAtNine = 0;

  const bookings = await BookingsModel.find({ date });

  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].id === id) {
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

  console.log("tables:", tables);

  /*  if (tables === 1) {
    if (tablesAtSix - tablesForId <= maxTables) {
    }
  } */

  if (tablesAtSix + tablesAtNine - tablesForId < 6) {
    console.log("in i if först");
    console.log("tables at 6", tablesAtSix);
    console.log("tables at 9", tablesAtNine);
    console.log("tables at 6 - tables", tablesAtSix - tablesForId);
    console.log("tables at 9 - tables", tablesAtNine - tablesForId);

    //  if (+tables === 2) {

    // alla true
    if (
      tablesAtSix - tablesForId <= biggerBooking &&
      tablesAtNine - tablesForId <= biggerBooking &&
      tablesAtSix - tablesForId < maxTables &&
      tablesAtNine - tablesForId < maxTables
    ) {
      console.log("1");
      const bothAvailible = {
        twoAtSix: true,
        twoAtNine: true,
        oneAtSix: true,
        oneAtNine: true,
      };
      res.status(200).send(bothAvailible);
    }

    // bara kl 6 ledigt både 1 och 2 bord
    if (
      tablesAtSix - tablesForId <= biggerBooking &&
      tablesAtNine - tablesForId > biggerBooking &&
      tablesAtSix - tablesForId < maxTables &&
      tablesAtNine - tablesForId >= maxTables
    ) {
      console.log("2");

      const twoTablesAtSix = {
        twoAtSix: true,
        twoAtNine: false,
        oneAtSix: true,
        oneAtNine: false,
      };
      res.status(200).send(twoTablesAtSix);
    }
    // bara kl 9 ledigt, 1 och 2 bord
    if (
      tablesAtNine - tablesForId <= biggerBooking &&
      tablesAtSix - tablesForId > biggerBooking &&
      tablesAtSix - tablesForId >= maxTables &&
      tablesAtNine - tablesForId < maxTables
    ) {
      console.log("3");

      const twoTablesAtNine = {
        twoAtNine: true,
        twoAtSix: false,
        oneAtSix: false,
        oneAtNine: true,
      };
      res.status(200).send(twoTablesAtNine);
    }

    // bara kl 6 ledigt, bara 1 bord
    if (
      tablesAtNine - tablesForId >= biggerBooking &&
      tablesAtSix - tablesForId >= biggerBooking &&
      tablesAtSix - tablesForId < maxTables &&
      tablesAtNine - tablesForId >= maxTables
    ) {
      console.log("3");

      const twoTablesAtNine = {
        twoAtNine: false,
        twoAtSix: false,
        oneAtSix: true,
        oneAtNine: false,
      };
      res.status(200).send(twoTablesAtNine);
    }

    // 6 och 9 ledigt, bara 1 bord
    if (
      tablesAtNine - tablesForId > biggerBooking &&
      tablesAtSix - tablesForId > biggerBooking &&
      tablesAtSix - tablesForId < maxTables &&
      tablesAtNine - tablesForId < maxTables
    ) {
      console.log("3");

      const twoTablesAtNine = {
        twoAtNine: false,
        twoAtSix: false,
        oneAtSix: true,
        oneAtNine: true,
      };
      res.status(200).send(twoTablesAtNine);
    }

    // bara kl 6 ledigt, 1 bord bara
    if (
      tablesAtNine - tablesForId >= biggerBooking &&
      tablesAtSix - tablesForId >= biggerBooking &&
      tablesAtSix - tablesForId < maxTables &&
      tablesAtNine - tablesForId >= maxTables
    ) {
      console.log("3");

      const twoTablesAtNine = {
        twoAtNine: false,
        twoAtSix: false,
        oneAtSix: true,
        oneAtNine: false,
      };
      res.status(200).send(twoTablesAtNine);
    }

    // bara kl 9 ledigt, 1 bord bara
    if (
      tablesAtNine - tablesForId >= biggerBooking &&
      tablesAtSix - tablesForId >= biggerBooking &&
      tablesAtSix - tablesForId >= maxTables &&
      tablesAtNine - tablesForId < maxTables
    ) {
      console.log("3");

      const twoTablesAtNine = {
        twoAtNine: false,
        twoAtSix: false,
        oneAtSix: false,
        oneAtNine: false,
      };
      res.status(200).send(twoTablesAtNine);
    }

    // }
    /* else if (+tables === 1) {
      console.log("in i 1 tables");

      if (
        tablesAtSix - tablesForId <= maxTables &&
        tablesAtNine - tablesForId <= maxTables
      ) {
        console.log("4");

        const bothAvailible = { twoAtSix: true, twoAtNine: true };
        res.status(200).send(bothAvailible);
      }

      if (
        tablesAtSix - tablesForId < maxTables &&
        tablesAtNine - tablesForId >= maxTables
      ) {
        console.log("5");

        const twoTablesAtSix = { twoAtSix: true, twoAtNine: false };
        res.status(200).send(twoTablesAtSix);
      }
      if (
        tablesAtNine - tablesForId < maxTables &&
        tablesAtSix - tablesForId >= maxTables
      ) {
        console.log("6");

        const twoTablesAtNine = { twoAtNine: true, twoAtSix: false };
        res.status(200).send(twoTablesAtNine);
      }
    } */
  } else {
    console.log("7");

    const bothTimesFull = { sixaclock: false, nineaclock: false };
    res.send(bothTimesFull);
  }

  //res.send(bookings);
});

module.exports = router;
