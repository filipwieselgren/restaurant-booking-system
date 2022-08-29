const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
app.use(cors());

const BookingsModel = require("../models/Bookings.js");

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "filipwieselgren@gmail.com",
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

  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: req.body.email,
      pass: "kztcpyrswulhulsn",
    },
  });

  const name = req.body.name;
  const email = req.body.email;
  const date = req.body.date;
  const time = req.body.time;
  const people = req.body.amountOfPeople;
  const cancel = "https://localhost:3000/cancel-booking";
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
  await createBooking.save();
  console.log("p1", req.body);
  // res.end();
});

module.exports = router;
