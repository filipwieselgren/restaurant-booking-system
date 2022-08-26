const express = require("express");
const router = express.Router();

const BookingsModel = require("../models/Bookings.js");

// steg 2 - kolla datum
router.get("/searchtables/:date", async (req, res) => {
  try {
    const date = req.params.date;

    const bookings = await BookingsModel.find({ date });
    console.log(bookings);

    if (bookings.length < 30) {
      const sixaclockArr = bookings.filter((date) => {
        return date.time === 18;
      });
      const nineaclockArr = bookings.filter((date) => {
        return date.time === 21;
      });

      console.log("six arr", sixaclockArr);
      console.log("nine arr", nineaclockArr);

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
  console.log("p1", req.body);
  res.end();
});

module.exports = router;
