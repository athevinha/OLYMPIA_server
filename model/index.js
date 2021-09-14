const dbConfig = require("../config/db.config");
const db = {};
const mongoose = require("mongoose");
const users = require("./users.model");
const tt = require("./users.model")
const kd = require("./users.model")
const vcnv = require("./users.model")
const vd = require("./users.model")

db.url = dbConfig.url;
db.mongoose = mongoose;
db.kd = kd;
db.vcnv = vcnv;
db.tt = tt;
db.vd = vd;
module.exports = db;