const express = require("express");
const router = express.Router();

router.get("/searchtables", (req, res) => {
  res.send("Hello from booking route 😉");
});

module.exports = router;
