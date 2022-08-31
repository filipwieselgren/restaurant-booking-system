const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
});

let user = {
  username: "admin",
  password: "admin1234",
};

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
