const express = require("express");
const router = express.Router();

const BookingsModel = require("../models/Bookings.js");

// steg 2 - kolla datum
router.get("/searchtables/:date/:amountOfPeople", async (req, res) => {
  try {
    const date = req.params.date;
    const qtyParams = req.params.amountOfPeople;

    let qty = 0;

    if (qtyParams <= 6) {
      qty = 1;
    } else {
      qty = 2;
    }

    const bookings = await BookingsModel.find({ date });
    // console.log("bookings", bookings);

    let totalBookedTablesAtSix = 0;
    let totalBookedTablesAtNine = 0;

    for (i = 0; i < bookings.length; i++) {}

    if (bookings.length < 30) {
      const sixaclockArr = bookings.filter((date) => {
        return date.time === 18;
      });

      for (i = 0; i < sixaclockArr.length; i++) {
        if (sixaclockArr[i].tables === 2) {
          totalBookedTablesAtSix += 2;
          // console.log("2 tables six", totalBookedTablesAtSix);
        } else {
          totalBookedTablesAtSix += 1;
          // console.log("1 tables six", totalBookedTablesAtSix);
        }
      }

      const nineaclockArr = bookings.filter((date) => {
        /*   if (date.tables === 2) {
          totalBookedTablesAtNine += 2;
          console.log("2 tables nine", totalBookedTablesAtNine);
        } else {
          totalBookedTablesAtNine += 1;
          console.log("1 tables nine", totalBookedTablesAtNine);
        } */

        return date.time === 21;
      });

      for (i = 0; i < nineaclockArr.length; i++) {
        if (nineaclockArr[i].tables === 2) {
          totalBookedTablesAtNine += 2;
        } else {
          totalBookedTablesAtNine += 1;
        }
      }

      console.log("total nine", totalBookedTablesAtNine);
      console.log("total six", totalBookedTablesAtSix);

      //console.log("six arr", sixaclockArr);
      // console.log("nine arr", nineaclockArr);

      const maxAmountOfTables = 5;
      const biggerBookingMaxTables = 3;

      const IfBiggerBooking = qty + biggerBookingMaxTables <= maxAmountOfTables;
      const ifBiggerBookingAtNine =
        qty + totalBookedTablesAtNine.length <= maxAmountOfTables;
      const ifBiggerBookingAtSix =
        qty + totalBookedTablesAtSix.length <= maxAmountOfTables;

      if (
        totalBookedTablesAtSix < maxAmountOfTables &&
        totalBookedTablesAtNine < maxAmountOfTables &&
        IfBiggerBooking
      ) {
        const bothTimes = { sixaclock: true, nineaclock: true };
        res.status(200).send(bothTimes);
      } else if (
        totalBookedTablesAtSix < maxAmountOfTables &&
        totalBookedTablesAtNine >= maxAmountOfTables &&
        ifBiggerBookingAtSix
      ) {
        const sixOnlyAvalible = { sixaclock: true, nineaclock: false };

        res.status(200).send(sixOnlyAvalible);
      } /* else if (nineaclockArr.length < maxAmountOfTables) {
        const nineOnlyAvalible = { sixaclock: false, nineaclock: true };

        res.status(200).send(nineOnlyAvalible);
      } */ else if (
        totalBookedTablesAtNine < maxAmountOfTables &&
        totalBookedTablesAtSix >= maxAmountOfTables &&
        ifBiggerBookingAtNine
      ) {
        const nineOnlyAvalible = { sixaclock: false, nineaclock: true };

        res.status(200).send(nineOnlyAvalible);
      }
    } else {
      const bothTimesFull = { sixaclock: false, nineaclock: false };
      res.send(bothTimesFull);
    }
    /*   if (sixaclockArr.length < 1 && nineaclockArr.length < maxAmountOfTables) {
        const bothTimes = { sixaclock: true, nineaclock: true };
        res.status(200).send(bothTimes);
      } else if (sixaclockArr.length < maxAmountOfTables) {
        const sixOnlyAvalible = { sixaclock: true, nineaclock: false };

        res.status(200).send(sixOnlyAvalible);
      } else if (nineaclockArr.length < maxAmountOfTables) {
        const nineOnlyAvalible = { sixaclock: false, nineaclock: true };

        res.status(200).send(nineOnlyAvalible);
      }
    } else {
      const bothTimesFull = { sixaclock: false, nineaclock: false };
      res.send(bothTimesFull);
    } */
  } catch (error) {
    console.log(error);
  }
});

router.post("/persondata", async (req, res) => {
  const createBooking = new BookingsModel(req.body);

  await createBooking.save();
  console.log("p1", req.body);
  res.end();
});

module.exports = router;
