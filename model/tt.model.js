const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
    stt:Number,
    question: String,
    score: Number,
    video:String,
});
const tts = mongoose.model("tt", exerciseSchema);
module.exports = tts;