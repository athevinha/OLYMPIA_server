const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 7878;

// Express config
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "./../../")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

server.listen(port, (serverError) => {
  if (serverError) throw serverError;
  console.info(`App is running on ${port}`);
});

let Data = [];
const db = require('./model/index')
const {users,kd,vcnv,tt,vd} = db;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect database");
  })
  .catch((e) => {
    console.log(e);
    process.exit();
  });

function addData(Obj, col) {
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

io.on("connection", (socket) => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  socket.on("disconnect", function () {
    console.log(socket.id + ": disconnected");
  });
  socket.on("recive data", (msg) => {
    // MongoClient.connect(url, function (err, db) {
    //   if (err) throw err;
    //   dbo = db.db("mydb");
    //   dbo
    //     .collection("users")
    //     .find({})
    //     .toArray(function (err, result) {
    //       io.emit("recive data", result);
    //     });
    // });
    io.emit()
  });
  socket.on("recive current", (m) => {
    // MongoClient.connect(url, function (err, db) {
    //   if (err) throw err;
    //   dbo = db.db("mydb");
    //   dbo
    //     .collection("current")
    //     .find({})
    //     .toArray(function (err, result) {
    //       //Data = result;
    //       if (err) throw err;
    //       io.emit("recive current", result);
    //     });
    // });
    //===============
  });
  //=====================================================================================================
  socket.on("add data", (user) => {
    addData(user, "users");
    io.emit("add data ok ", getData());
  });

  socket.on("add point", (point) => {
    AddPoint({ name: point.name }, { $set: { score: point.point } });
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
  socket.on("play sound VCNV", (UserAns) => {
    io.emit("play sound VCNV", UserAns);
  });
  socket.on("play sound TT", (UserAns) => {
    io.emit("play sound TT", UserAns);
  });
  socket.on("change people", (point) => {
    io.emit("change pp", "wqe");
  });
  //=====================================================================================================
  socket.on("choose ques", (ques) => {
    io.emit("choose ques", ques);
  });
  socket.on("check ans vd", (ques) => {
    io.emit("check ans vd", ques);
  });

  //=====================================================================================================
  socket.on("disable", (dis) => {
    io.emit("disable", dis);
  });
  socket.on("show list VCNV", (ques) => {
    io.emit("show list VCNV", ques);
  });

  socket.on("on send VD", (ques) => {
    io.emit("on send VD", ques);
  });

  socket.on("show list TT", (ques) => {
    console.log("qergwerg");

    io.emit("show list TT", ques);
  });
  socket.on("Wrong Answer", (ques) => {
    io.emit("Wrong Answer", ques);
  });
  socket.on("show answervcnv", (ques) => {
    io.emit("show answervcnv", ques);
  });
  socket.on("Open Picture", (ques) => {
    io.emit("Open Picture", ques);
  });
  socket.on("Add score", (obj) => {
    AddPoint({ name: obj.name }, { $set: { score: obj.score } });
    io.emit("Add score", obj);
  });
  socket.on("Add score TT", (obj) => {
    AddPoint({ name: obj.name }, { $set: { score: obj.score } });
    io.emit("Add score TT", obj);
  });
  socket.on("submit ques", (ques) => {
    io.emit("choose ques", ques);
  });
  socket.on("on VCNV", (data) => {
    io.emit("on VCNV", data);
  });
  socket.on("time VD", (data) => {
    io.emit("time VD", data);
  });
  socket.on("start time", (data) => {
    io.emit("start time", data);
  });
  socket.on("send VD", (data) => {
    io.emit("send VD", data);
  });
  socket.on("choose Star", (data) => {
    io.emit("choose Star", data);
  });
  socket.on("open choose quesVD", (data) => {
    io.emit("open choose quesVD", data);
  });
  socket.on("close choose quesVD", (data) => {
    io.emit("close choose quesVD", data);
  });
  socket.on("next pp vd", (data) => {
    io.emit("next pp vd", data);
  });
  socket.on("true chp", (data) => {
    io.emit("true chp", data);
  });
  socket.on("TongKetDiem", (data) => {
    io.emit("TongKetDiem", data);
  });
  // MongoClient.connect(url, function (err, db) {
  //   if (err) throw err;
  //   let quesVCNV = [];
  //   let quesTT = [];
  //   let quesVD = [];
  //   let quesCHP = [];
  //   dbo = db.db("mydb");
  //   dbo
  //     .collection("VCNV")
  //     .find({})
  //     .toArray(function (err, result) {
  //       quesVCNV = result;
  //       db.close();
  //     });
  //   dbo
  //     .collection("VD")
  //     .find({})
  //     .toArray(function (err, result) {
  //       quesVD = result;
  //       db.close();
  //     });
  //   dbo
  //     .collection("CHP")
  //     .find({})
  //     .toArray(function (err, result) {
  //       quesCHP = result;
  //       db.close();
  //     });
  //   dbo
  //     .collection("TT")
  //     .find({})
  //     .toArray(function (err, result) {
  //       quesTT = result;
  //       db.close();
  //     });
  //   dbo
  //     .collection("questions")
  //     .find({})
  //     .toArray(function (err, result) {
  //       socket.on("get ques", (a) => {
  //         io.emit("get ques", [result, quesVCNV, quesTT, quesVD, quesCHP]);
  //       });
  //       db.close();
  //     });
  // });
});

//
