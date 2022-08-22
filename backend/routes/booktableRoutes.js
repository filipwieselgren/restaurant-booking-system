const express = require("express");
const router = express.Router();

const BookingsModel = require("../models/Bookings.js");

router.get("/searchtables/:date", async (req, res) => {
  console.log("Starting get...");

  try {
    const getDate = req.params.date;

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
        console.log(`Here is six a clock ${sixaclockArr}`);
        console.log(`Here is nine a clock ${nineaclockArr}`);

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

router.post("/searchtables/", async (req, res) => {
  const person1 = new BookingsModel({
    name: "Linnea",
    date: "2020-05-12",
    amountOfPeople: 6,
    time: 21,
    email: "tuvis@hej",
    phone: 123456789,
  });

  person1.save();
  console.log("p1", person1);
  res.send(person1);
});

router.post("/persondata", (req, res) => {
  res.send(req.body);
  console.log("req.body", req.body);
});

module.exports = router;
