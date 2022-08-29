const express = require("express");
const router = express.Router();

const BookingsModel = require("../models/Bookings.js");

// steg 2 - kolla datum
router.get("/searchtables/:date/:amountOfPeople", async (req, res) => {
  try {
    const date = req.params.date;
    const qtyParams = req.params.amountOfPeople;

    let totalBookedTablesAtSix = 0;
    let totalBookedTablesAtNine = 0;
    const maxAmountOfTables = 15;
    const biggerBookingMaxTables = 13;

    let qty = 0;

    if (qtyParams <= 6) {
      qty = 1;
    } else {
      qty = 2;
    }

    const bookings = await BookingsModel.find({ date });

    const sixaclockArr = bookings.filter((date) => {
      return date.time === 18;
    });

    for (i = 0; i < sixaclockArr.length; i++) {
      if (sixaclockArr[i].tables === 2) {
        totalBookedTablesAtSix += 2;
      } else {
        totalBookedTablesAtSix += 1;
      }
    }

    const nineaclockArr = bookings.filter((date) => {
      return date.time === 21;
    });

    for (i = 0; i < nineaclockArr.length; i++) {
      if (nineaclockArr[i].tables === 2) {
        totalBookedTablesAtNine += 2;
      } else {
        totalBookedTablesAtNine += 1;
      }
    }

    const ifTwoTablesAtSix = qty + totalBookedTablesAtSix <= maxAmountOfTables;
    const ifTwoTablesAtNine =
      qty + totalBookedTablesAtNine <= maxAmountOfTables;

    console.log("booked at six", totalBookedTablesAtSix);
    console.log("booked at nine", totalBookedTablesAtNine);

    if (totalBookedTablesAtSix + totalBookedTablesAtNine + qty <= 30) {
      if (
        totalBookedTablesAtSix < maxAmountOfTables &&
        totalBookedTablesAtNine < maxAmountOfTables &&
        ifTwoTablesAtSix &&
        ifTwoTablesAtNine
      ) {
        const bothTimes = { sixaclock: true, nineaclock: true };
        res.status(200).send(bothTimes);
      }

      if (qty === 2) {
        if (
          totalBookedTablesAtSix <= biggerBookingMaxTables &&
          totalBookedTablesAtNine > biggerBookingMaxTables
        ) {
          const sixOnlyAvalible = { sixaclock: true, nineaclock: false };

          res.status(200).send(sixOnlyAvalible);
        } else if (
          totalBookedTablesAtNine <= biggerBookingMaxTables &&
          totalBookedTablesAtSix > biggerBookingMaxTables
        ) {
          const nineOnlyAvalible = { sixaclock: false, nineaclock: true };

          res.status(200).send(nineOnlyAvalible);
        }
      }

      if (qty === 1) {
        if (
          totalBookedTablesAtSix < maxAmountOfTables &&
          totalBookedTablesAtNine >= maxAmountOfTables
        ) {
          const sixOnlyAvalible = { sixaclock: true, nineaclock: false };

          res.status(200).send(sixOnlyAvalible);
        } else if (
          totalBookedTablesAtNine < maxAmountOfTables &&
          totalBookedTablesAtSix >= maxAmountOfTables
        ) {
          const nineOnlyAvalible = { sixaclock: false, nineaclock: true };

          res.status(200).send(nineOnlyAvalible);
        }
      }
    } else {
      const bothTimesFull = { sixaclock: false, nineaclock: false };
      res.send(bothTimesFull);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/persondata", async (req, res) => {
  const createBooking = new BookingsModel(req.body);

  await createBooking.save();
  res.end();
});

module.exports = router;
