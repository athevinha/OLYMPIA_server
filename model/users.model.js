const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  username: String, // #
  gmail: String, // #
  password: String, // #
  score: Number,
  tooken: String
});
const users = mongoose.model("user", exerciseSchema);
module.exports = users;