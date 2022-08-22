const express = require("express");
const router = express.Router();

const BookingsModel = require("../models/Bookings.js");

router.get("/searchtables/:amoutOfPeopl/:date", async (req, res) => {
  console.log("Starting get...");

  try {
    const getDate = req.params.date;
    const getAmout = req.params.amountOfPeople;
    console.log(getDate);
    console.log(getAmout);

    const bookings = await BookingsModel.find();

    const dateBookings = bookings.filter((booking) => {
      return booking.date === getDate;
    });

    if (dateBookings.length < 30) {
      const sixaclockArr = dateBookings.filter((date) => {
        return date.time === 18;
      });
      const nineaclockArr = dateBookings.filter((date) => {
        return date.time === 21;
      });

      const maxAmountOfTables = 15;

      if (
        sixaclockArr.length < maxAmountOfTables &&
        nineaclockArr.length < maxAmountOfTables
      ) {
        console.log(`Table at 18 ${sixaclockArr}`);
        console.log(`Table at 21 ${nineaclockArr}`);

        const times = { sixaclock: sixaclockArr, nineaclock: nineaclockArr };

        res.status(200).send(times);
      } else if (sixaclockArr.length < maxAmountOfTables) {
        console.log(`Here is six a clock ${sixaclockArr}`);

        res.status(200).send(sixaclockArr);
      } else if (nineaclockArr.length < maxAmountOfTables) {
        console.log(`Here is nine a clock ${nineaclockArr}`);

        res.status(200).send(`Here is nine a clock ${nineaclockArr}`);
      }
    } else {
      res
        .status(404)
        .send("We are full this day. Please choose another day! 💚");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/searchtables/:amountOfPeople/:date/:time", async (req, res) => {
  const postDate = req.params.date;
  const postAmout = req.params.amountOfPeople;
  const postTime = req.params.time;

  const newBooking = new BookingsModel({
    name: req.body.name,
    date: postDate,
    amountOfPeople: postAmout,
    time: postTime,
    email: req.body.email,
    phone: req.body.phone,
  });

  newBooking.save();
  console.log("newBooking", newBooking);
  res.status(201).send(newBooking);
});

module.exports = router;
