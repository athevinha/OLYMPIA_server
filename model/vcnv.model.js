const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
    stt: Number,
    ques: String,
    score: Number,
    answer:String, // tiếng bị giật um 
    image: String
});
const vcnvs = mongoose.model("vcnv", exerciseSchema);
module.exports = vcnvs;