const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  name: String, // #
  gmail: String, // #
  pass: String, // #
  score: Number,
  avatar:String,
  tooken: String
});
const users = mongoose.model("user", exerciseSchema);
module.exports = users;