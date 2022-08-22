const express = require("express");
const router = express.Router();

const BookingsModel = require("../models/Bookings.js");

router.get("/login", async (req, res) => {
  const getBookings = await BookingsModel.find();

  getBookings.sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log(getBookings.length);

  res.send(getBookings);
});

// Skapa en bokning

router.get("/create/:amoutOfPeople/:date", async (req, res) => {
  console.log("Starting get from admin create...");

  try {
    const getDateAdmin = req.params.date;
    const getAmoutAdmin = req.params.amountOfPeople;
    console.log(getDateAdmin);
    console.log(getAmoutAdmin);

    const bookingsAdmin = await BookingsModel.find();

    const dateBookingsAdmin = bookingsAdmin.filter((booking) => {
      return booking.date === getDateAdmin;
    });

    if (dateBookingsAdmin.length < 30) {
      const sixaclockArrAdmin = dateBookingsAdmin.filter((date) => {
        return date.time === 18;
      });
      const nineaclockArrAdmin = dateBookingsAdmin.filter((date) => {
        return date.time === 21;
      });

      const maxAmountOfTablesAdmin = 15;

      if (
        sixaclockArrAdmin.length < maxAmountOfTablesAdmin &&
        nineaclockArrAdmin.length < maxAmountOfTablesAdmin
      ) {
        console.log(`Table at 18 ${sixaclockArrAdmin}`);
        console.log(`Table at 21 ${nineaclockArrAdmin}`);

        const times = {
          sixaclock: sixaclockArrAdmin,
          nineaclock: nineaclockArrAdmin,
        };

        res.status(200).send(times);
      } else if (sixaclockArrAdmin.length < maxAmountOfTablesAdmin) {
        console.log(`Here is six a clock ${sixaclockArrAdmin}`);

        res.status(200).send(sixaclockArrAdmin);
      } else if (nineaclockArrAdmin.length < maxAmountOfTablesAdmin) {
        console.log(`Here is nine a clock ${nineaclockArrAdmin}`);

        res.status(200).send(`Here is nine a clock ${nineaclockArrAdmin}`);
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

router.post("/create/:amountOfPeople/:date/:time", async (req, res) => {
  const postDateAdmin = req.params.date;
  const postAmoutAdmin = req.params.amountOfPeople;
  const postTimeAdmin = req.params.time;

  const newBookingAdmin = new BookingsModel({
    name: req.body.name,
    date: postDateAdmin,
    amountOfPeople: postAmoutAdmin,
    time: postTimeAdmin,
    email: req.body.email,
    phone: req.body.phone,
  });

  newBookingAdmin.save();
  console.log("newBooking", newBookingAdmin);
  res.status(201).send(newBookingAdmin);
});

// Ta bort bokning

router.delete("/bookings/:id/delete", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBooking = await BookingsModel.findByIdAndDelete(id);
    if (!deletedBooking) return res.status(404);
    console.log(deletedBooking);
    return res.send(deletedBooking);
  } catch (e) {
    return res.status(400);
  }
});

router.get("/bookings/:email/search", async (req, res) => {
  const getEmail = req.params.email;

  const bookingsAdmin = await BookingsModel.find();

  const dateBookingsAdmin = bookingsAdmin.filter((booking) => {
    return booking.email.trim() === getEmail.trim();
  });

  console.log(dateBookingsAdmin);
  res.status(200).send(dateBookingsAdmin);
});

// Sök efter bokning

module.exports = router;
