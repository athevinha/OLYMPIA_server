// Socket====================================================
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const portIO = process.env.PORT || 5000;
server.listen(portIO, () => `Listen on *: ${portIO}`);
let Data = [];
//MongoDB
let stt = 0;
var Users;
const bodyParser = require("body-parser");
const PORT = 4001;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");
//=====================================================================================================
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database" + err);
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, function () {
  console.log("Server is running on Port:", PORT);
});

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
let dbo;
//=====================================================================================================
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  dbo = db.db("mydb");

  dbo
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      Data = result;
      Users = result;
      db.close();
    });
});
//=====================================================================================================
function addData(Obj, col) {
  // add
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("mydb");
    dbo.collection(col).insertOne(Obj, function (err, res) {
      if (err) throw err;
      console.log("insert : " + Obj.name);
      db.close();
    });
  });
}

//=====================================================================================================
function getData() {
  // update
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("mydb");
    dbo
      .collection("users")
      .find({})
      .toArray(function (err, result) {
        Data = result;

        db.close();
      });
  });
  console.log(Data);

  return Data;
}
//====================================================================================================
function AddPoint(myQuery, NewQuery) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    // var myQuery = { address: "Valley 345" };
    //var NewQuery = { $set: { name: "Mickey", address: "Canyon 123" } };
    dbo.collection("users").updateOne(myQuery, NewQuery, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
}
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
io.on("connection", (socket) => {
  const { id } = socket.client;

  `User connected: ${id}`;

  socket.on("recive data", (msg) => {
    //=================
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      dbo = db.db("mydb");
      dbo
        .collection("users")
        .find({})
        .toArray(function (err, result) {
          //Data = result;
          // if (err) throw err;
          io.emit("recive data", result);
        });
    });
    //===============
  });
  //=====================================================================================================
  socket.on("recive current", (m) => {
    //=================
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      dbo = db.db("mydb");
      dbo
        .collection("current")
        .find({})
        .toArray(function (err, result) {
          //Data = result;
          if (err) throw err;
          io.emit("recive current", result);
        });
    });
    //===============
  });
  //=====================================================================================================
  socket.on("add data", (user) => {
    addData(user, "users");

    // getData();
    io.emit("add data ok ", getData());
  });
  //===============================get ques======================================================================
  // let R = [];
  // MongoClient.connect(url, function (err, db) {
  //   if (err) throw err;
  //   dbo = db.db("mydb");
  //   dbo
  //     .collection("users")
  //     .find({})
  //     .toArray(function (err, result) {
  //       R = result;
  //       db.close();
  //     });
  // });
  socket.on("add point", (point) => {
    // getData();
    //io.emit("add data ok ", getData());
    AddPoint({ name: point.name }, { $set: { score: point.point } });
    //console.log(point.stt);
    io.emit("add point ok", {
      point: point.point,
      stt: point.stt,
      data: point.users,
    });
  });
  //======================================================
  socket.on("on send answer", (UserAns) => {
    io.emit("on send answer", UserAns);
  });
  socket.on("change people", (point) => {
    // getData();
    //io.emit("add data ok ", getData());
    //console.log(point.stt);
    io.emit("change pp", "wqe");
  });
  //=====================================================================================================
  socket.on("choose ques", (ques) => {
    //console.log(user);
    io.emit("choose ques", ques);
  });

  //=====================================================================================================
  socket.on("disable", (dis) => {
    //console.log(user);
    io.emit("disable", dis);
  });
  socket.on("show list VCNV", (ques) => {
    console.log("qergwerg");

    io.emit("show list VCNV", ques);
  });
  socket.on("show answervcnv", (ques) => {
    io.emit("show answervcnv", ques);
  });
  socket.on("Open Picture", (ques) => {
    io.emit("Open Picture", ques);
  });
  //=====================================================================================================
  //=====================================================================================================
  socket.on("Add score", (obj) => {
    AddPoint({ name: obj.name }, { $set: { score: obj.score } });
    io.emit("Add score", obj);
  });
  //=====================================================================================================
  socket.on("submit ques", (ques) => {
    //console.log(user);
    io.emit("choose ques", ques);
  });
  //======================================================================================
  socket.on("on VCNV", (data) => {
    io.emit("on VCNV", data);
  });
  //=====================================================================================================
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let quesVCNV = [];
    let quesTT = [];
    dbo = db.db("mydb");
    dbo
      .collection("VCNV")
      .find({})
      .toArray(function (err, result) {
        //Data = result;

        quesVCNV = result;

        //console.log(result);
        db.close();
      });
    dbo
      .collection("TT")
      .find({})
      .toArray(function (err, result) {
        //Data = result;

        quesTT = result;

        //console.log(result);
        db.close();
      });
    dbo
      .collection("questions")
      .find({})
      .toArray(function (err, result) {
        //Data = result;

        socket.on("get ques", (a) => {
          io.emit("get ques", [result, quesVCNV, quesTT]);
        });

        //console.log(result);
        db.close();
      });
  });
  //=====================================================================================================
});

//