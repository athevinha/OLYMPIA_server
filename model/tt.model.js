const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
    stt:Number,
    question: String,
    score: Number,
    video:String,
});
const users = mongoose.model("user", exerciseSchema);
module.exports = users;