require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("./database.js");

const BookingsModel = require("./models/Bookings.js");
