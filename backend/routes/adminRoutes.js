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

//hämta single booking
router.get("/bookings/:id", async (req, res) => {
  const id = ObjectId(req.params.id);
  try {
    const singleBooking = await BookingsModel.findOne({ _id: id });
    // console.log("find by id", singleBooking);
    res.status(200).send(singleBooking);
  } catch (error) {
    res.status(404).send(error.message);
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

router.get("/:id/:date/:tables/:time", async (req, res) => {
  console.log("startar");
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
      // console.log("booking[i]", bookings[i]);
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

  // console.log("tables:", tables);

  let ifBookingIsAtSix = false;
  let ifBookingIsAtNine = false;

  if (booking.time === 18) {
    for (let i = 0; i < sixaclockArr.length; i++) {
      if (sixaclockArr[i]._id.toString() === id) {
        ifBookingIsAtSix = true;
        console.log("bokning är kl 6666");
      }
    }
  }

  if (booking.time === 21) {
    for (let i = 0; i < nineaclockArr.length; i++) {
      if (nineaclockArr[i]._id.toString() === id) {
        ifBookingIsAtNine = true;
        console.log("bokning är kl 9");
      }
    }
  }

  console.log("if at six", ifBookingIsAtSix);
  console.log("if at nine", ifBookingIsAtNine);
  console.log("nio arr", tablesAtNine);
  console.log("sex arr", tablesAtSix);
  /*   console.log("nio arr - tables", tablesAtNine - tables);
  console.log("six arr - tables", tablesAtSix - tables); */
  console.log("tables choosen in react:", tables);
  console.log("tables already booked::", tablesForId);
  console.log("time:", time);

  if (ifBookingIsAtNine) {
    console.log("1");
    //tog bort =
    // tablesAtNine - tablesForId + tables + tablesAtSix < 6
    if (tablesAtNine - tablesForId + tables + tablesAtSix < 6) {
      console.log("2");

      if (tables === 2) {
        console.log("3");

        /*  tablesAtNine - tablesForId + tables <= biggerBooking &&
          tablesAtSix <= biggerBooking */
        if (
          tablesAtNine - tablesForId + tables <= biggerBooking &&
          tablesAtSix <= biggerBooking
        ) {
          console.log("4");

          const bothTimesAvaTwo = { sixaclock: true, nineaclock: true };
          res.status(200).send(bothTimesAvaTwo);
        }

        // tog bort =, om krånglar är det här
        /*  tablesAtSix <= biggerBooking &&
          tablesAtNine - tablesForId + tables > biggerBooking */
        if (
          tablesAtSix <= biggerBooking &&
          tablesAtNine - tablesForId + tables > biggerBooking
        ) {
          console.log("5");
          const onlySixAvaTwo = { sixaclock: true, nineaclock: false };
          res.status(200).send(onlySixAvaTwo);
        }

        /* tablesAtSix > biggerBooking &&
          tablesAtNine - tablesForId + tables <= biggerBooking */
        if (
          tablesAtSix > biggerBooking &&
          tablesAtNine - tablesForId + tables <= biggerBooking
        ) {
          console.log("6");
          const onlyNineAvaTwo = { sixaclock: false, nineaclock: true };
          res.status(200).send(onlyNineAvaTwo);
        }
      }

      if (tables === 1) {
        console.log("7");

        // tablesAtSix < maxTables &&
        //tablesAtNine - tablesForId + tables < maxTables
        if (
          tablesAtSix < maxTables &&
          tablesAtNine - tablesForId + tables < maxTables
        ) {
          console.log("8");
          const bothTimesAvaOne = { sixaclock: true, nineaclock: true };
          res.status(200).send(bothTimesAvaOne);
        }
        // tablesAtSix < maxTables &&
        //tablesAtNine - tablesForId + tables >= maxTables
        if (
          tablesAtSix < maxTables &&
          tablesAtNine - tablesForId + tables >= maxTables
        ) {
          console.log("9");
          const onlySixAvaOne = { sixaclock: true, nineaclock: false };
          res.status(200).send(onlySixAvaOne);
        }
        // tablesAtSix >= maxTables &&
        //tablesAtNine - tablesForId + tables < maxTables
        if (
          tablesAtSix >= maxTables &&
          tablesAtNine - tablesForId + tables < maxTables
        ) {
          console.log("10");
          const onlyNineAvaOne = { sixaclock: false, nineaclock: true };
          res.status(200).send(onlyNineAvaOne);
        }
      }
    } else {
      console.log("11");
      const bothTimesFull = { sixaclock: false, nineaclock: false };
      res.send(bothTimesFull);
    }
  }

  const bookSmallTabel = 2;

  if (ifBookingIsAtSix) {
    console.log("12");
    // tog bort =
    if (tablesAtSix - tablesForId + tables + tablesAtNine < 6) {
      console.log("13");

      if (tables === 2) {
        console.log("14");

        /*  tablesAtSix - tablesForId + tables <= biggerBooking &&
          tablesAtNine <= biggerBooking */
        if (
          tablesAtSix - tablesForId + tables <= biggerBooking &&
          tablesAtNine <= biggerBooking
        ) {
          console.log("15");

          const bothTimesAvaTwo = { sixaclock: true, nineaclock: true };
          res.status(200).send(bothTimesAvaTwo);
        }
        /*  tablesAtSix - tablesForId + tables <= biggerBooking &&
          tablesAtNine > biggerBooking */
        if (
          tablesAtSix - tablesForId + tables <= biggerBooking &&
          tablesAtNine > biggerBooking
        ) {
          console.log("16");

          const onlySixAvaTwo = { sixaclock: true, nineaclock: false };
          res.status(200).send(onlySixAvaTwo);
        }
        /*  tablesAtSix - tablesForId + tables > biggerBooking &&
          tablesAtNine <= biggerBooking */
        if (
          tablesAtSix - tablesForId + tables > biggerBooking &&
          tablesAtNine <= biggerBooking
        ) {
          console.log("17");

          const onlyNineAvaTwo = { sixaclock: false, nineaclock: true };
          res.status(200).send(onlyNineAvaTwo);
        }
      }

      if (tables === 1) {
        console.log("18");
        //tablesAtSix - tablesForId + tables < maxTables &&
        //tablesAtNine < maxTables
        if (
          tablesAtSix - tablesForId + tables <= maxTables &&
          tablesAtNine < maxTables
        ) {
          console.log("19");

          const bothTimesAvaOne = { sixaclock: true, nineaclock: true };
          res.status(200).send(bothTimesAvaOne);
        }
        //  tablesAtSix - tablesForId + tables < maxTables &&
        // tablesAtNine >= maxTables
        if (
          tablesAtSix - tablesForId < maxTables &&
          tablesAtNine >= maxTables
        ) {
          console.log("20");

          const onlySixAvaOne = { sixaclock: true, nineaclock: false };
          res.status(200).send(onlySixAvaOne);
        }
        // tablesAtSix - tablesForId + tables >= maxTables &&
        // tablesAtNine < maxTables
        if (
          tablesAtSix - tablesForId + tables >= maxTables &&
          tablesAtNine < maxTables
        ) {
          console.log("21");

          const onlyNineAvaOne = { sixaclock: false, nineaclock: true };
          res.status(200).send(onlyNineAvaOne);
        }
      }
    } else {
      console.log("22");
      const bothTimesFull = { sixaclock: false, nineaclock: false };
      res.send(bothTimesFull);
    }
  }
});

module.exports = router;
