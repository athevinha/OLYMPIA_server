const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
    stt:Number,
    ques: String,
    point: Number
});
const chps = mongoose.model("chp", exerciseSchema);
module.exports = chps;