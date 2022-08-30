const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
app.use(cors());

const BookingsModel = require("../models/Bookings.js");

// const contactEmail = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "filipwieselgren@gmail.com",
//     pass: "kztcpyrswulhulsn",
//   },
// });

// contactEmail.verify((error) => {
//   if (error) {
//     console.log("This is  why it working:", error);
//   } else {
//     console.log("Ready to Send");
//   }
// });

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
        console.log(bothTimes);
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
    } else {
      const bothTimesFull = { sixaclock: false, nineaclock: false };
      res.send(bothTimesFull);
      console.log(bothTimesFull);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/persondata", async (req, res) => {
  const createBooking = new BookingsModel(req.body);

  await createBooking.save();
  console.log("p1", req.body);

  const contactEmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: req.body.email,
      pass: "kztcpyrswulhulsn",
    },
  });

  contactEmail.verify((error) => {
    if (error) {
      console.log("This is  why it working:", error);
    } else {
      console.log("Ready to Send");
    }
  });

  const name = req.body.name;
  const email = req.body.email;
  const date = req.body.date;
  const time = req.body.time;
  const id = req.body.cancelid;
  const people = req.body.amountOfPeople;
  const cancel = `http://localhost:3000/booktable/cancel/${id}`;
  const mail = {
    from: name,
    to: req.body.email,
    subject: `Your table is booked`,
    html: `<h1>Hi ${name} and welcome to Leon! 💚</h1>
          <p>Here is your booking details</p>
          <p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Date: ${date}</p>
           <p>Time: ${time}</p>
           <p>People: ${people}</p>
           <p>If you want to cancel your booking, please click <a href=${cancel}>here.</a></p>`,
  };
  contactEmail.sendMail(mail, async (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });

  // res.end();
});

module.exports = router;
