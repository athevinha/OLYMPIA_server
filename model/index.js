const dbConfig = require("../config/db.config");
const db = {};
const mongoose = require("mongoose");
const users = require("./users.model");
const tts = require("./tt.model")
const kds = require("./kd.model")
const vcnvs = require("./vcnv.model")
const vds = require("./vd.model")

db.url = dbConfig.url;
db.mongoose = mongoose;
db.users = users;
db.kds = kds;
db.vcnvs = vcnvs;
db.tts = tts;
db.vds = vds;
module.exports = db;