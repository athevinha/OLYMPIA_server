const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
    stt:Number,
    ques: String,
    answer:String,
    score: Number,
    video:String,
});
const tts = mongoose.model("tt", exerciseSchema);
module.exports = tts;