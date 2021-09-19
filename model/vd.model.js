const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
    stt:Number,
    question: String,
    score: Number
});
const vds = mongoose.model("vd", exerciseSchema);
module.exports = vds;