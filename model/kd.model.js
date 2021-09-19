const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
    stt:Number,
    ques: String,
    score: Number
});
const kds = mongoose.model("kd", exerciseSchema);
module.exports = kds;