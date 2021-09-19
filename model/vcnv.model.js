const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
    stt: Number,
    question: String,
    score: Number,
    image: String
});
const vcnvs = mongoose.model("vcnv", exerciseSchema);
module.exports = vcnvs;